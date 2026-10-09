"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { tenants, TenantConfig, Role, defaultTenant } from "@/config/tenant";

interface TenantContextType {
  tenant: TenantConfig;
  setTenantId: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  availableTenants: TenantConfig[];
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig>(defaultTenant);
  const [role, setRole] = useState<Role>("Manager");

  const setTenantId = (id: string) => {
    const found = tenants.find(t => t.id === id);
    if (found) setTenant(found);
  };

  // Update CSS variables for the tenant
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", tenant.accentColor);
    // You could dynamically load fonts, layouts, etc. here
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, setTenantId, role, setRole, availableTenants: tenants }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
