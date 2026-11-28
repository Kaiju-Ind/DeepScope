import { browser } from 'wxt/browser';
import { startContentRuntime } from "../lib/content/install.ts";
import { logContentEvent, summarizeContentError } from "../lib/content/logging.ts";

export default defineContentScript({
  registration: "runtime",
  runAt: "document_idle",
  noScriptStartedPostMessage: true,
  /** Start the content owner with the browser's privacy flag and replace private startup errors before WXT can log page details. */
  main(ctx) {
    const incognito = browser.extension?.inIncognitoContext === true;
    try {
      startContentRuntime(ctx, incognito);
    } catch (error) {
      if (!incognito) throw error;
      logContentEvent("runtime-start-failed", summarizeContentError(error, incognito));
      // WXT logs startup exceptions before returning them to the injection caller.
      throw new Error("DeepScope content runtime failed to start.");
    }
  },
});
