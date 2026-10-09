import { format, parseISO } from "date-fns";
import { defaultTenant } from "@/config/tenant";

export function formatCurrency(amount: number, currencyCode: string = defaultTenant.currency, locale: string = defaultTenant.language) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string, formatStr: string = defaultTenant.dateFormat) {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    return dateString;
  }
}

export function formatDateTime(dateString: string) {
  try {
    return format(parseISO(dateString), `${defaultTenant.dateFormat} h:mm a`);
  } catch (error) {
    return dateString;
  }
}
