import { installDiagnosticCrashHooks } from "../../lib/diagnostics/crash.ts";
import * as logging from '../../lib/diagnostics/logging.ts';
import { Host } from "../../lib/matcher/offscreen/host.ts";

logging.configure('offscreen');
installDiagnosticCrashHooks('offscreen');

/**
 * Start matcher runtime only inside the bundled Chrome offscreen document.
 *
 * WXT imports entrypoint dependencies during prepare/build in a Node-like host.
 * Keeping the runtime check here makes the entrypoint import-safe while the
 * matcher host remains a separately testable capability module.
 */
if (typeof globalThis.document !== 'undefined' && typeof globalThis.Worker !== 'undefined') new Host().start();
