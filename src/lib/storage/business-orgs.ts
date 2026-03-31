import type { BusinessOrganization } from "@/types/seller";

const KEY = "azpey_business_organizations";

export function loadOrganizations(): BusinessOrganization[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BusinessOrganization[];
  } catch {
    return [];
  }
}

export function saveOrganizations(orgs: BusinessOrganization[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(orgs));
}

export function addOrganization(org: BusinessOrganization): void {
  const list = loadOrganizations();
  saveOrganizations([...list, org]);
}
