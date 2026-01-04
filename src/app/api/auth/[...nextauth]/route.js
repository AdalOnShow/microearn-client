import { handlers } from "@/lib/auth";

// Force Node.js runtime (not Edge) because MongoDB driver uses crypto
export const runtime = "nodejs";

export const { GET, POST } = handlers;
