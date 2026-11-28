import { buildAnalysisUpdate } from './model/update.ts';

/** Opt-in probe installed by the browser artifact verifier before panel startup. */
const APP_ARTIFACT_VALIDATION_KEY = '__kaijuDeepScopeAppArtifactValidationV1';

/** Release-check probe that exposes the generated model seam only when requested. */
type AppArtifactValidationProbeType = {
	publish(runtime: { readonly buildAnalysisUpdate: typeof buildAnalysisUpdate }): void;
};

/** Publish the model seam for the post-build Chromium validation harness. */
export function publish(): void {
	const scope = globalThis as typeof globalThis & {
		[APP_ARTIFACT_VALIDATION_KEY]?: AppArtifactValidationProbeType;
	};
	const probe = scope[APP_ARTIFACT_VALIDATION_KEY];
	if (typeof probe?.publish !== 'function') return;
	probe.publish({ buildAnalysisUpdate });
}
