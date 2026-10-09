export type Role = "Owner" | "Manager" | "Front Desk" | "Housekeeping";

export interface RoomType {
  id: string;
  name: string;
  color: string; // Taildwind color or hex
}

export interface TenantConfig {
  id: string;
  propertyName: string;
  logo: string;
  accentColor: string; // CSS variable value for --primary
  currency: string;
  currencySymbol: string;
  timezone: string;
  dateFormat: string;
  language: string;
  roomTypes: RoomType[];
}

export const tenants: TenantConfig[] = [
  {
    id: "t-001",
    propertyName: "The Grand Hotel",
    logo: "G",
    accentColor: "45 100% 65%", // Gold
    currency: "USD",
    currencySymbol: "$",
    timezone: "America/New_York",
    dateFormat: "MMM d, yyyy",
    language: "en-US",
    roomTypes: [
      { id: "rt-1", name: "Standard", color: "bg-blue-500" },
      { id: "rt-2", name: "Deluxe", color: "bg-purple-500" },
      { id: "rt-3", name: "Suite", color: "bg-brand-gold" },
    ]
  },
  {
    id: "t-002",
    propertyName: "Oceanview Resort",
    logo: "O",
    accentColor: "199 89% 48%", // Ocean Blue
    currency: "EUR",
    currencySymbol: "€",
    timezone: "Europe/Madrid",
    dateFormat: "dd MMM yyyy",
    language: "en-GB",
    roomTypes: [
      { id: "rt-4", name: "Ocean Villa", color: "bg-cyan-500" },
      { id: "rt-5", name: "Beachfront", color: "bg-teal-500" },
    ]
  }
];

export const defaultTenant = tenants[0];
