export const NETWORK = (process.env.NETWORK ?? "main") as "main" | "test";
export const NODE_URL =
  process.env.NODE_URL ?? `https://node-${NETWORK}net.vechain.energy`;
export const API_URL = process.env.API_URL ?? "/api";
