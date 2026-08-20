import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
import * as host from '@/lib/matcher/offscreen/host';

logging.configure('offscreen');
installDiagnosticCrashHooks('offscreen');

/**
 * Start matcher runtime only inside the bundled Chrome offscreen document.
 *
 * WXT imports entrypoint dependencies during prepare/build in a Node-like host.
 * Keeping the runtime check here makes the entrypoint import-safe while the
 * matcher host remains a separately testable capability module.
 */
if (typeof globalThis.document !== 'undefined' && typeof globalThis.Worker !== 'undefined') host.start();
