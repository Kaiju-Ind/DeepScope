import { start } from "../lib/background/coordinator.ts";

/**
 * WXT imports this module while generating the manifest in Node.js. Browser
 * resources are acquired only when WXT starts the background context. The
 * coordinator registers listeners synchronously before this callback returns.
 */
export default defineBackground(() => { start(); });
