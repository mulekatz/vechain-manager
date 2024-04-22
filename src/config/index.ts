export const NETWORK = "main" as "main" | "test";
export const NODE_URL = `https://node-${NETWORK}net.vechain.energy`;
export const API_URL = import.meta.env.VITE_API_URL ?? "/api";
