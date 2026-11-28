export type DetectionKind =
	| 'dom'
	| 'html'
	| 'imageSrc'
	| 'scriptSrc'
	| 'stylesheetHref'
	| 'resourceUrl'
	| 'requestUrl'
	| 'scriptContent'
	| 'stylesheetContent'
	| 'cookie'
	| 'header'
	| 'responseHeader'
	| 'requestHeader'
	| 'jsGlobal'
	| 'meta'
	| 'link'
	| 'storage'
	| 'url'
	| 'text'
	| 'robots'
	| 'dns'
	| 'certIssuer'
	| 'probe'
	| 'relationship';

export type RuntimeDetectionKind = Exclude<DetectionKind, 'relationship'>;


/**
 * Runtime regular-expression representation.
 *
 * TypeScript-authored registry rules use native `RegExp` values. Packaged matcher
 * shards keep source and flags as plain data so loading a shard does not eagerly
 * allocate thousands of native regular-expression objects before routing proves
 * that a rule can evaluate the current observation.
 */
export type DetectionPatternType = RegExp | {
	readonly source: string;
	readonly flags: string;
};

export type VersionExtraction =
	| {
		source: 'match';
		group?: number | string;
		template?: string;
		confidence?: number;
	}
	| {
		source: 'matchedValue';
		pattern: DetectionPatternType;
		group?: number | string;
		template?: string;
		confidence?: number;
	}
	| {
		source: 'static';
		value: string;
		confidence?: number;
	};

type DetectionRuleBase = {
	id?: string;
	confidence?: number;
	description?: string;
	version?: VersionExtraction;
	/** Original rule index preserved when generated matcher shards filter a technology's rules. */
	sourceRuleIndex?: number;
};

export type PatternDetectionRule = DetectionRuleBase & {
	kind:
		| 'html'
		| 'imageSrc'
		| 'scriptSrc'
		| 'stylesheetHref'
		| 'resourceUrl'
		| 'requestUrl'
		| 'scriptContent'
		| 'stylesheetContent'
		| 'url'
		| 'text'
		| 'robots'
		| 'certIssuer'
		| 'probe';
	pattern?: DetectionPatternType;
	selector?: never;
	property?: never;
	key?: never;
	valuePattern?: never;
};

export type DomDetectionRule = DetectionRuleBase & {
	kind: 'dom';
	selector: string;
	attribute?: string;
	valuePattern?: DetectionPatternType;
	pattern?: never;
	property?: never;
	key?: never;
};

/**
 * Cookie detection is name-first. Values stay unavailable to runtime rules until
 * we add an intentional local-only redacted value matcher.
 */
export type CookieDetectionRule = DetectionRuleBase & {
	kind: 'cookie';
	key?: string;
	keyPattern?: DetectionPatternType;
	pattern?: never;
	selector?: never;
	property?: never;
	valuePattern?: never;
};

export type HeaderDetectionRule = DetectionRuleBase & {
	kind: 'header' | 'responseHeader' | 'requestHeader';
	key: string;
	valuePattern?: DetectionPatternType;
	pattern?: never;
	selector?: never;
	property?: never;
};

export type MetaDetectionRule = DetectionRuleBase & {
	kind: 'meta';
	key: string;
	pattern?: DetectionPatternType;
	valuePattern?: DetectionPatternType;
	selector?: never;
	property?: never;
};

export type JsGlobalDetectionRule = DetectionRuleBase & {
	kind: 'jsGlobal';
	property: string;
	valuePattern?: DetectionPatternType;
	pattern?: never;
	selector?: never;
	key?: never;
};

export type LinkDetectionRule = DetectionRuleBase & {
	kind: 'link';
	rel?: string;
	hrefPattern?: DetectionPatternType;
	typePattern?: DetectionPatternType;
	as?: string;
	hreflangPattern?: DetectionPatternType;
	mediaPattern?: DetectionPatternType;
	valuePattern?: DetectionPatternType;
	pattern?: never;
	selector?: never;
	property?: never;
	key?: never;
};

export type StorageDetectionRule = DetectionRuleBase & {
	kind: 'storage';
	area?: 'localStorage' | 'sessionStorage';
	key?: string;
	keyPattern?: DetectionPatternType;
	valuePattern?: never;
	pattern?: never;
	selector?: never;
	property?: never;
};

export type DnsDetectionRule = DetectionRuleBase & {
	kind: 'dns';
	recordType: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'SOA' | 'TXT';
	valuePattern: DetectionPatternType;
	pattern?: never;
	selector?: never;
	property?: never;
	key?: never;
};

export type DetectionRule =
	| PatternDetectionRule
	| DomDetectionRule
	| CookieDetectionRule
	| HeaderDetectionRule
	| MetaDetectionRule
	| JsGlobalDetectionRule
	| LinkDetectionRule
	| StorageDetectionRule
	| DnsDetectionRule;

export type DetectionRelationshipKind = 'implies' | 'requires' | 'excludes';

export type DetectionRelationship = {
	kind: DetectionRelationshipKind;
	target: string;
	reason?: string;
};
