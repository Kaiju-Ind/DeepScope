import type { ExtensionError } from '@/lib/messaging/failure';

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

export type CategoryId =
	| "framework"
	| "ui-library"
	| "router"
	| "bundler"
	| "transpiler"
	| "minifier"
	| "module-format"
	| "styling-library"
	| "styling-processor"
	| "state-management"
	| "http-client"
	| "api-pattern"
	| "analytics"
	| "monitoring-error-tracking"
	| "dates"
	| "translations"
	| "animation"
	| "form-schema-library"
	| "table-library"
	| "component-library"
	| "platform-cms-builder"
	| "advertising-paid-media"
	| "experimentation-optimization"
	| "accessibility"
	| "business-tools"
	| "booking-scheduling"
	| "authentication-identity"
	| "privacy-compliance"
	| "security"
	| "commerce-operations"
	| "ecommerce-extensions"
	| "wordpress-ecosystem"
	| "content-publishing"
	| "community-ugc"
	| "search"
	| "rich-text-editors"
	| "email-messaging"
	| "marketing-automation"
	| "tag-management"
	| "surveys-feedback"
	| "maps-location"
	| "media-video"
	| "infrastructure-hosting"
	| "server-runtime-infra"
	| "network-hardware"
	| "mobile"
	| "developer-tooling"
	| "graphics-visualization"
	| "widgets-misc"
	| "domain-parking"
	| "fundraising-donations"
	| "unknown";
	
export type Category = {
	id: CategoryId;
	label: string;
	priority: number;
};

export type TechnologyComponentKind =
	| 'platform'
	| 'edition'
	| 'distribution'
	| 'module'
	| 'plugin'
	| 'extension'
	| 'theme'
	| 'storefront'
	| 'adapter'
	| 'connector'
	| 'sdk'
	| 'infrastructure'
	| 'feature-provider'
	| 'unknown';

export type TechnologySourceIdentityKind =
	| 'composer-package'
	| 'npm-package'
	| 'magento-module'
	| 'wordpress-plugin'
	| 'wordpress-theme'
	| 'marketplace-listing'
	| 'repository'
	| 'script-origin'
	| 'api-origin'
	| 'asset-path';

export type TechnologySourceIdentity = {
	kind: TechnologySourceIdentityKind;
	value: string;
	url?: string;
};

export type TechnologyIntegrationKind =
	| 'integrates-with'
	| 'adapts'
	| 'connects-to'
	| 'replaces'
	| 'extends'
	| 'fork-of';

export type TechnologyIntegration = {
	kind: TechnologyIntegrationKind;
	target: string;
	reason?: string;
};

export type TechnologyComponentDefinition = {
	kind: TechnologyComponentKind;
	parentTechnologyId?: string;
	vendor?: string;
	sourceIdentities?: TechnologySourceIdentity[];
	features?: string[];
	integrations?: TechnologyIntegration[];
};

export type TechnologyVersioningDefinition =
	| {
		enabled: false;
		reason?: string;
	}
	| {
		enabled?: true;
		scheme: 'semver' | 'numeric-dotted' | 'adobe-commerce-release' | string;
	};

export type EvidenceScope = {
	frameId?: number;
	isTopFrame?: boolean;
	url?: string;
	origin?: string;
};


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

/** Metadata needed after matching without retaining executable detection rules. */
export type TechnologyProfileType = {
	readonly id: string;
	readonly name: string;
	readonly website: string;
	readonly description?: string;
	readonly icon?: string;
	readonly categories: readonly CategoryId[];
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

export type DetectionRunOptions = {
	disabledKinds?: readonly DetectionKind[];
	disabledRuleIds?: readonly string[];
};

export type TechnologyDefinition = TechnologyProfileType & {
	rules: DetectionRule[];
	implies?: string[];
	requires?: string[];
	excludes?: string[];
	relationships?: DetectionRelationship[];
	priority?: number;
	component?: TechnologyComponentDefinition;
	versioning?: TechnologyVersioningDefinition;
	metadata?: {
		saas?: boolean;
		oss?: boolean;
		pricing?: string[];
		cpe?: string;
	};
};

/** Minimal executable technology shape carried by one matcher shard. */
export type MatcherTechnologyType = Pick<TechnologyDefinition, 'id' | 'name' | 'rules'>;

export type Evidence = {
	kind: DetectionKind;
	ruleDescription?: string;
	matchedValue?: string;
	confidence: number;
	version?: string;
	direct?: boolean;
	sourceTechnologyId?: string;
	/** Observation lookup key, such as a header name, meta name, global path, or storage key. */
	observationKey?: string;
	/** Scalar observation context that helps users understand property-based evidence. */
	attributes?: Record<string, string | number | boolean>;
	scope?: EvidenceScope;
};

export type ConfidenceScore = {
	value: number;
	level: 'low' | 'medium' | 'high' | 'certain';
};

export type DetectionResult = {
	technologyId: string;
	name: string;
	website: string;
	description?: string;
	icon?: string;
	categories: CategoryId[];
	confidence: ConfidenceScore;
	version?: string;
	evidence: Evidence[];
	inferred?: boolean;
	warnings?: string[];
};

export type CookieSignals = Record<string, true>;

export type HtmlMatchSignal = {
	matchedValue: string;
	captures: string[];
};

export type LinkSignal = {
	rel: string;
	href: string;
	type?: string;
	as?: string;
	media?: string;
	hreflang?: string;
	crossOrigin?: string;
};

export type ResourceSignal = {
	url: string;
	initiatorType?: string;
};

export type RequestSignal = {
	url: string;
	method?: string;
	type?: string;
	requestHeaders?: Record<string, string>;
	responseHeaders?: Record<string, string>;
};

export type StorageSignals = {
	localStorage: Record<string, true>;
	sessionStorage: Record<string, true>;
};

export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'SOA' | 'TXT';

export type DnsSignals = Partial<Record<DnsRecordType, string[]>>;

export type PageSignals = {
	url: string;
	hostname: string;
	html: string;
	htmlMatches?: Record<string, HtmlMatchSignal>;
	text: string;
	images?: string[];
	scripts: string[];
	stylesheets: string[];
	links: LinkSignal[];
	resources: ResourceSignal[];
	requests: RequestSignal[];
	scriptContents: string[];
	stylesheetContents: string[];
	cookies: CookieSignals;
	headers: Record<string, string>;
	meta: Record<string, string[]>;
	dom: {
		selectors: Record<string, boolean>;
	};
	storage: StorageSignals;
	/**
	 * JavaScript globals from the inspected page's context.
	 *
	 * Browser-extension content scripts run in an isolated context by default, so
	 * this stays empty until we inject a script directly into the page. 
	 */
	jsGlobals: Record<string, unknown>;
	robotsTxt: string;
	dnsRecords: DnsSignals;
	certIssuer: string;
	probeResults: string[];
	collectedAt: number;
};

export type SiteAnalysis = {
	url: string;
	hostname: string;
	analyzedAt: number;
	source: 'fresh' | 'cache';
	results: DetectionResult[];
	errors: ExtensionError[];
};

export type AnalysisStatus = {
	totalAnalyses: number;
	trackedOrigins: number;
	lastAnalyzedAt?: number;
};
