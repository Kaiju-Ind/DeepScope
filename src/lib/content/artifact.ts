import type { PageSignals } from '@/lib/detection/types';
import type { CollectPageSignalsInput, ContentApi, ObservationStopReason } from '@/lib/messaging';

/** Isolated-world opt-in used only by the generated content-script runtime validator. */
export const VALIDATION_KEY = '__kaijuDeepScopeContentArtifactValidationV1';

/** Minimal runtime surface required by the post-build generated-artifact check. */
export type ArtifactRuntimeType = {
	/** Real RPC API created by the generated content entrypoint. */
	readonly contentApi: ContentApi;
	/** Run the generated bounded DOM collector before RPC payload validation. */
	collectPageSignals(input: CollectPageSignalsInput): Promise<PageSignals>;
	/** Stop observers and timers after the validator finishes. */
	dispose(reason: ObservationStopReason): void;
};

/** Probe installed by the post-build Chromium validator before it executes the generated bundle. */
type ArtifactProbeType = {
	publish(runtime: ArtifactRuntimeType): void;
};

/**
 * Publish the generated content runtime only when the post-build validator installed a probe.
 *
 * Normal extension pages do not create this property. Chrome content scripts also run in
 * an isolated world, so page JavaScript cannot use this hook to reach the extension API.
 */
export function publish(runtime: ArtifactRuntimeType): void {
	const scope = globalThis as typeof globalThis & {
		[VALIDATION_KEY]?: ArtifactProbeType;
	};
	const probe = scope[VALIDATION_KEY];
	if (typeof probe?.publish !== 'function') {
		return;
	}

	probe.publish(runtime);
}
