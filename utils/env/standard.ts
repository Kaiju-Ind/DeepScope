// Vendored from Kaiju-Ind/Utils packages/env/standard.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
export { compose, define, requirement, secret, variable } from './definition.ts';
export type { ComposeEnvironmentFields } from './definition.ts';
export { EnvironmentError, EnvironmentValidatorError } from './error.ts';
export { example, manifest, requirementReport } from './projection.ts';
export { blank } from './value.ts';
export { env, isSource, merge, record, select } from './source.ts';
export type {
	EnvironmentDefinition,
	EnvironmentField,
	EnvironmentFieldKind,
	EnvironmentFieldMetadata,
	EnvironmentFieldMetadataInput,
	EnvironmentFields,
	EnvironmentIssue,
	EnvironmentManifest,
	EnvironmentManifestField,
	EnvironmentParseResult,
	EnvironmentRecord,
	EnvironmentRequirement,
	EnvironmentRequirementField,
	EnvironmentRequirementReason,
	EnvironmentRequirementReportField,
	EnvironmentSource,
	EnvironmentSourceInput,
	InferEnvironment,
	InferEnvironmentField,
	InferEnvironmentFields,
} from './types.ts';
