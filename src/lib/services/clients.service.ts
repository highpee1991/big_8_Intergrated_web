import { clients } from "@/data/clients";
import type { Client } from "@/types/content";

export async function getClients(): Promise<Client[]> {
  return clients;
}
