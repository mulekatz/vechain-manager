export const NETWORK = "main" as "main" | "test";
export const NODE_URL = `https://node-${NETWORK}net.vechain.energy`;
export const API_URL = import.meta.env.VITE_API_URL ?? "/api";
export const X_CONTRACT_ADDRESS =
  import.meta.env.VITE_X_CONTRACT_ADDRESS ??
  "0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302";
