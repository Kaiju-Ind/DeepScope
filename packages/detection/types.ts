import type { DetectionKind } from '@deepscope/registry/rules';
import type { CategoryId } from '@deepscope/registry/types';
import type { AnalysisFailure } from './failure.ts';

export type EvidenceScope = {
	frameId?: number;
	isTopFrame?: boolean;
	url?: string;
	origin?: string;
};

export type DetectionRunOptions = {
	disabledKinds?: readonly DetectionKind[];
	disabledRuleIds?: readonly string[];
};

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
	errors: AnalysisFailure[];
};

export type AnalysisStatus = {
	totalAnalyses: number;
	trackedOrigins: number;
	lastAnalyzedAt?: number;
};
