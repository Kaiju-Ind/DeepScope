import type { DetectionRule, DetectionRelationship } from './rules.ts';

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

/** Metadata needed after matching without retaining executable detection rules. */
export type TechnologyProfileType = {
	readonly id: string;
	readonly name: string;
	readonly website: string;
	readonly description?: string;
	readonly icon?: string;
	readonly categories: readonly CategoryId[];
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
