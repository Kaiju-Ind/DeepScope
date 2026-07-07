import * as z from 'zod/mini';

import { categories } from '../../data/categories';
import type { CategoryId, TechnologyDefinition } from '../detection/types';
import type { RegistryValidationResult } from './diagnostics';
import { diagnosticsFromZodError } from './diagnostics';
import { REGISTRY_SOURCE_SCHEMA_VERSION, type RegistrySourceSchemaVersion } from './source-schema-version';

z.config({ jitless: true });
z.config(z.locales.en());

export { REGISTRY_SOURCE_SCHEMA_VERSION, type RegistrySourceSchemaVersion } from './source-schema-version';

/** Detection kinds accepted by the current TypeScript registry schema. */
const runtimeDetectionKindSchema = z.enum([
	'dom',
	'html',
	'scriptSrc',
	'stylesheetHref',
	'resourceUrl',
	'requestUrl',
	'scriptContent',
	'stylesheetContent',
	'cookie',
	'header',
	'responseHeader',
	'requestHeader',
	'jsGlobal',
	'meta',
	'link',
	'storage',
	'url',
	'text',
	'robots',
	'dns',
	'certIssuer',
	'probe',
]);

/** Relationship kinds accepted by the detection graph. */
const relationshipKindSchema = z.enum(['implies', 'requires', 'excludes']);

/** DNS record types supported by the current detector schema. */
const dnsRecordTypeSchema = z.enum(['A', 'AAAA', 'CNAME', 'MX', 'NS', 'SOA', 'TXT']);

/** Storage areas that content scripts can describe without reading stored values. */
const storageAreaSchema = z.enum(['localStorage', 'sessionStorage']);

/** Shared non-empty string schema used anywhere an empty registry field is invalid. */
const nonEmptyStringSchema = z.string().check(z.minLength(1));

/** Optional non-empty string field used by several rule shapes. */
const optionalNonEmptyStringSchema = z.optional(nonEmptyStringSchema);

/** Confidence values are percentages and keep the same range as the classic Zod schema. */
const confidenceSchema = z.number().check(z.gte(0), z.lte(100));

/** Optional confidence-like number shared by rule and version definitions. */
const optionalConfidenceSchema = z.optional(confidenceSchema);

/** Non-negative integer used for rule indexes and numeric capture-group references. */
const nonnegativeIntegerSchema = z.int().check(z.gte(0));

/** Optional non-negative integer used by generated rule source maps. */
const optionalNonnegativeIntegerSchema = z.optional(nonnegativeIntegerSchema);

/** Category ids must match the category table used by the popup and detector. */
const categoryIdSchema = z.custom<CategoryId>((value) => typeof value === 'string' && value in categories, {
	error: 'Unknown category id.',
});

/** RegExp values are still allowed because the active source format is TypeScript. */
const regexpSchema = z.instanceof(RegExp, { error: 'Expected a RegExp instance.' });

/** Capture groups may be a non-negative numeric group or a named group. */
const versionCaptureGroupSchema = z.union([nonnegativeIntegerSchema, nonEmptyStringSchema]);

/** Shared rule fields available on every detection rule. */
const ruleBaseShape = {
	id: optionalNonEmptyStringSchema,
	confidence: optionalConfidenceSchema,
	description: optionalNonEmptyStringSchema,
	version: z.optional(z.lazy(() => versionExtractionSchema)),
	sourceRuleIndex: optionalNonnegativeIntegerSchema,
};

/** Version extraction rules supported by the current detector. */
const versionExtractionSchema = z.discriminatedUnion('source', [
	z.strictObject({
		source: z.literal('match'),
		group: z.optional(versionCaptureGroupSchema),
		template: optionalNonEmptyStringSchema,
		confidence: optionalConfidenceSchema,
	}),
	z.strictObject({
		source: z.literal('matchedValue'),
		pattern: regexpSchema,
		group: z.optional(versionCaptureGroupSchema),
		template: optionalNonEmptyStringSchema,
		confidence: optionalConfidenceSchema,
	}),
	z.strictObject({
		source: z.literal('static'),
		value: nonEmptyStringSchema,
		confidence: optionalConfidenceSchema,
	}),
]);

/** Pattern rule kinds that use one regular expression over one observation value. */
const patternKindSchema = z.enum([
	'html',
	'scriptSrc',
	'stylesheetHref',
	'resourceUrl',
	'requestUrl',
	'scriptContent',
	'stylesheetContent',
	'url',
	'text',
	'robots',
	'certIssuer',
	'probe',
]);

/** Runtime schema for pattern detection rules. */
const patternDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: patternKindSchema,
	pattern: z.optional(regexpSchema),
});

/** Runtime schema for selector-backed DOM rules. */
const domDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('dom'),
	selector: nonEmptyStringSchema,
	attribute: optionalNonEmptyStringSchema,
	valuePattern: z.optional(regexpSchema),
});

/** Runtime schema for cookie-name rules. */
const cookieDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('cookie'),
	key: optionalNonEmptyStringSchema,
	keyPattern: z.optional(regexpSchema),
}).check(z.refine((rule) => Boolean(rule.key || rule.keyPattern), {
	error: 'Cookie rules need either key or keyPattern.',
}));

/** Runtime schema for response/request/header rules. */
const headerDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.enum(['header', 'responseHeader', 'requestHeader']),
	key: nonEmptyStringSchema,
	valuePattern: z.optional(regexpSchema),
});

/** Runtime schema for meta tag rules. */
const metaDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('meta'),
	key: nonEmptyStringSchema,
	pattern: z.optional(regexpSchema),
	valuePattern: z.optional(regexpSchema),
});

/** Runtime schema for page-global rules. */
const jsGlobalDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('jsGlobal'),
	property: nonEmptyStringSchema,
	valuePattern: z.optional(regexpSchema),
});

/** Runtime schema for link element rules. */
const linkDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('link'),
	rel: optionalNonEmptyStringSchema,
	hrefPattern: z.optional(regexpSchema),
	typePattern: z.optional(regexpSchema),
	as: optionalNonEmptyStringSchema,
	hreflangPattern: z.optional(regexpSchema),
	mediaPattern: z.optional(regexpSchema),
	valuePattern: z.optional(regexpSchema),
});

/** Runtime schema for storage-key rules. */
const storageDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('storage'),
	area: z.optional(storageAreaSchema),
	key: optionalNonEmptyStringSchema,
	keyPattern: z.optional(regexpSchema),
}).check(z.refine((rule) => Boolean(rule.key || rule.keyPattern), {
	error: 'Storage rules need either key or keyPattern.',
}));

/** Runtime schema for DNS record rules. */
const dnsDetectionRuleSchema = z.strictObject({
	...ruleBaseShape,
	kind: z.literal('dns'),
	recordType: dnsRecordTypeSchema,
	valuePattern: regexpSchema,
});

/** Runtime schema for every current TypeScript detection rule. */
export const detectionRuleSchema = z.union([
	patternDetectionRuleSchema,
	domDetectionRuleSchema,
	cookieDetectionRuleSchema,
	headerDetectionRuleSchema,
	metaDetectionRuleSchema,
	jsGlobalDetectionRuleSchema,
	linkDetectionRuleSchema,
	storageDetectionRuleSchema,
	dnsDetectionRuleSchema,
]);

/** Runtime schema for explicit graph relationships. */
export const detectionRelationshipSchema = z.strictObject({
	kind: relationshipKindSchema,
	target: nonEmptyStringSchema,
	reason: optionalNonEmptyStringSchema,
});

/** Runtime schema for one TypeScript technology definition. */
export const technologyDefinitionSchema = z.strictObject({
	id: nonEmptyStringSchema,
	name: nonEmptyStringSchema,
	website: nonEmptyStringSchema,
	description: optionalNonEmptyStringSchema,
	icon: optionalNonEmptyStringSchema,
	categories: z.array(categoryIdSchema).check(z.minLength(1)),
	rules: z.array(detectionRuleSchema),
	implies: z.optional(z.array(nonEmptyStringSchema)),
	requires: z.optional(z.array(nonEmptyStringSchema)),
	excludes: z.optional(z.array(nonEmptyStringSchema)),
	relationships: z.optional(z.array(detectionRelationshipSchema)),
	priority: z.optional(z.number()),
	metadata: z.optional(z.strictObject({
		saas: z.optional(z.boolean()),
		oss: z.optional(z.boolean()),
		pricing: z.optional(z.array(nonEmptyStringSchema)),
		cpe: optionalNonEmptyStringSchema,
	})),
});

/** Runtime schema for the current registry source envelope. */
export const registrySourceSchema = z.strictObject({
	schemaVersion: z.literal(REGISTRY_SOURCE_SCHEMA_VERSION),
	technologies: z.array(technologyDefinitionSchema),
});

/** Registry source accepted by validation and compiler phases. */
export type RegistrySource = z.output<typeof registrySourceSchema>;

/**
 * Validate current TypeScript technology definitions without throwing.
 *
 * The compiler uses `safeParse` so malformed rule sources become diagnostics
 * that tests and future CLI output can display, rather than exceptions that
 * skip source-map and cross-reference checks.
 */
export function validateRegistrySource(source: unknown): RegistryValidationResult<{
	readonly schemaVersion: RegistrySourceSchemaVersion;
	readonly technologies: TechnologyDefinition[];
}> {
	const result = registrySourceSchema.safeParse(source);
	if (!result.success) {
		return {
			diagnostics: diagnosticsFromZodError(result.error),
			valid: false,
		};
	}

	return {
		value: result.data as { schemaVersion: RegistrySourceSchemaVersion; technologies: TechnologyDefinition[] },
		diagnostics: [],
		valid: true,
	};
}
