import { isWithinInterval, parseISO, isSameDay, startOfDay, eachDayOfInterval, format } from "date-fns";
import { mockRooms, mockRoomTypes, mockReservations, mockWorkOrders, mockInvoices } from "./mock-data";

/**
 * Shared Metrics Module
 * Rules:
 * - Occupancy % = rooms sold / rooms available
 * - ADR = room revenue / rooms sold
 * - RevPAR = room revenue / rooms available (= ADR * Occupancy)
 * - Total Revenue = room revenue + extras + F&B
 */

export function calculateMetricsForDateRange(startDate: Date, endDate: Date, filters?: any) {
  const days = eachDayOfInterval({ start: startOfDay(startDate), end: startOfDay(endDate) });
  
  let totalRoomsAvailable = 0;
  let totalRoomsSold = 0;
  let totalRoomRevenue = 0;
  let totalExtrasRevenue = 0;
  let totalCancellations = 0;

  // Pre-calculate daily metrics for the chart
  const dailyMetrics = days.map(day => {
    let dayAvail = 0;
    let daySold = 0;
    let dayRoomRev = 0;
    let dayExtrasRev = 0;

    // 1. Calculate available rooms (Total rooms - OOO)
    mockRoomTypes.forEach((rt: any) => {
      let rAvail = rt.totalRooms;
      // Subtract OOO
      const ooo = mockWorkOrders.filter((wo: any) => {
        if (!wo.location.startsWith("Room ")) return false;
        const roomNum = wo.location.replace("Room ", "");
        const room = mockRooms.find((r: any) => r.number === roomNum);
        if (room?.type !== rt.id) return false;
        if (wo.status === "Resolved") return false; 
        return true; // Simplified OOO check
      });
      rAvail -= ooo.length;
      dayAvail += Math.max(0, rAvail);
    });

    // 2. Calculate sold rooms and room revenue from reservations
    const dayBookings = mockReservations.filter((res: any) => {
      if (res.status === "Cancelled" || res.status === "No Show") return false;
      const cIn = startOfDay(parseISO(res.checkIn));
      const cOut = startOfDay(parseISO(res.checkOut));
      return day >= cIn && day < cOut; // Guest stays the night
    });

    daySold += dayBookings.length;

    // We'll estimate daily room revenue by dividing total amount by stay length
    // For a more exact system, this would read from daily rates or folios
    dayBookings.forEach((res: any) => {
      // Mock: 90% is room rev, 10% is extras (or look at invoices)
      const stayNights = Math.max(1, (startOfDay(parseISO(res.checkOut)).getTime() - startOfDay(parseISO(res.checkIn)).getTime()) / (1000 * 60 * 60 * 24));
      const dailyRev = res.totalAmount / stayNights;
      dayRoomRev += (dailyRev * 0.9);
      dayExtrasRev += (dailyRev * 0.1);
    });
    
    // Add cancellations
    const cancellations = mockReservations.filter((res: any) => 
      (res.status === "Cancelled" || res.status === "No Show") && 
      isSameDay(parseISO(res.checkIn), day)
    ).length;

    totalRoomsAvailable += dayAvail;
    totalRoomsSold += daySold;
    totalRoomRevenue += dayRoomRev;
    totalExtrasRevenue += dayExtrasRev;
    totalCancellations += cancellations;

    return {
      date: day,
      dateStr: format(day, "yyyy-MM-dd"),
      shortDate: format(day, "MMM d"),
      available: dayAvail,
      sold: daySold,
      occupancy: dayAvail > 0 ? (daySold / dayAvail) * 100 : 0,
      roomRev: dayRoomRev,
      extrasRev: dayExtrasRev,
      totalRev: dayRoomRev + dayExtrasRev,
      adr: daySold > 0 ? dayRoomRev / daySold : 0,
      revpar: dayAvail > 0 ? dayRoomRev / dayAvail : 0,
      cancellations
    };
  });

  const overallOccupancy = totalRoomsAvailable > 0 ? (totalRoomsSold / totalRoomsAvailable) * 100 : 0;
  const overallAdr = totalRoomsSold > 0 ? totalRoomRevenue / totalRoomsSold : 0;
  const overallRevpar = totalRoomsAvailable > 0 ? totalRoomRevenue / totalRoomsAvailable : 0; // = overallAdr * (overallOccupancy / 100)

  return {
    summary: {
      roomsAvailable: totalRoomsAvailable,
      roomsSold: totalRoomsSold,
      occupancy: overallOccupancy,
      roomRevenue: totalRoomRevenue,
      extrasRevenue: totalExtrasRevenue,
      totalRevenue: totalRoomRevenue + totalExtrasRevenue,
      adr: overallAdr,
      revpar: overallRevpar,
      cancellations: totalCancellations
    },
    daily: dailyMetrics
  };
}
