import type { CategoryId, TechnologyDefinition } from "../types.ts";
import type { DetectionRule } from "../rules.ts";
import { frameworkTechnologyDefinitions } from "./framework/index.ts";
import { uiLibraryTechnologyDefinitions } from "./ui-library/index.ts";
import { routerTechnologyDefinitions } from "./router/index.ts";
import { bundlerTechnologyDefinitions } from "./bundler/index.ts";
import { transpilerTechnologyDefinitions } from "./transpiler/index.ts";
import { minifierTechnologyDefinitions } from "./minifier/index.ts";
import { moduleFormatTechnologyDefinitions } from "./module-format/index.ts";
import { stylingLibraryTechnologyDefinitions } from "./styling-library/index.ts";
import { stylingProcessorTechnologyDefinitions } from "./styling-processor/index.ts";
import { stateManagementTechnologyDefinitions } from "./state-management/index.ts";
import { httpClientTechnologyDefinitions } from "./http-client/index.ts";
import { apiPatternTechnologyDefinitions } from "./api-pattern/index.ts";
import { analyticsTechnologyDefinitions } from "./analytics/index.ts";
import { monitoringErrorTrackingTechnologyDefinitions } from "./monitoring-error-tracking/index.ts";
import { datesTechnologyDefinitions } from "./dates/index.ts";
import { translationsTechnologyDefinitions } from "./translations/index.ts";
import { animationTechnologyDefinitions } from "./animation/index.ts";
import { formSchemaLibraryTechnologyDefinitions } from "./form-schema-library/index.ts";
import { tableLibraryTechnologyDefinitions } from "./table-library/index.ts";
import { componentLibraryTechnologyDefinitions } from "./component-library/index.ts";
import { platformCmsBuilderTechnologyDefinitions } from "./platform-cms-builder/index.ts";
import { advertisingPaidMediaTechnologyDefinitions } from "./advertising-paid-media/index.ts";
import { experimentationOptimizationTechnologyDefinitions } from "./experimentation-optimization/index.ts";
import { accessibilityTechnologyDefinitions } from "./accessibility/index.ts";
import { businessToolsTechnologyDefinitions } from "./business-tools/index.ts";
import { bookingSchedulingTechnologyDefinitions } from "./booking-scheduling/index.ts";
import { authenticationIdentityTechnologyDefinitions } from "./authentication-identity/index.ts";
import { privacyComplianceTechnologyDefinitions } from "./privacy-compliance/index.ts";
import { securityTechnologyDefinitions } from "./security/index.ts";
import { commerceOperationsTechnologyDefinitions } from "./commerce-operations/index.ts";
import { ecommerceExtensionsTechnologyDefinitions } from "./ecommerce-extensions/index.ts";
import { wordpressEcosystemTechnologyDefinitions } from "./wordpress-ecosystem/index.ts";
import { contentPublishingTechnologyDefinitions } from "./content-publishing/index.ts";
import { communityUgcTechnologyDefinitions } from "./community-ugc/index.ts";
import { searchTechnologyDefinitions } from "./search/index.ts";
import { richTextEditorsTechnologyDefinitions } from "./rich-text-editors/index.ts";
import { emailMessagingTechnologyDefinitions } from "./email-messaging/index.ts";
import { marketingAutomationTechnologyDefinitions } from "./marketing-automation/index.ts";
import { tagManagementTechnologyDefinitions } from "./tag-management/index.ts";
import { surveysFeedbackTechnologyDefinitions } from "./surveys-feedback/index.ts";
import { mapsLocationTechnologyDefinitions } from "./maps-location/index.ts";
import { mediaVideoTechnologyDefinitions } from "./media-video/index.ts";
import { infrastructureHostingTechnologyDefinitions } from "./infrastructure-hosting/index.ts";
import { serverRuntimeInfraTechnologyDefinitions } from "./server-runtime-infra/index.ts";
import { networkHardwareTechnologyDefinitions } from "./network-hardware/index.ts";
import { mobileTechnologyDefinitions } from "./mobile/index.ts";
import { developerToolingTechnologyDefinitions } from "./developer-tooling/index.ts";
import { graphicsVisualizationTechnologyDefinitions } from "./graphics-visualization/index.ts";
import { widgetsMiscTechnologyDefinitions } from "./widgets-misc/index.ts";
import { domainParkingTechnologyDefinitions } from "./domain-parking/index.ts";
import { fundraisingDonationsTechnologyDefinitions } from "./fundraising-donations/index.ts";

export const technologyDefinitionsByCategory = {
	"framework": frameworkTechnologyDefinitions,
	"ui-library": uiLibraryTechnologyDefinitions,
	"router": routerTechnologyDefinitions,
	"bundler": bundlerTechnologyDefinitions,
	"transpiler": transpilerTechnologyDefinitions,
	"minifier": minifierTechnologyDefinitions,
	"module-format": moduleFormatTechnologyDefinitions,
	"styling-library": stylingLibraryTechnologyDefinitions,
	"styling-processor": stylingProcessorTechnologyDefinitions,
	"state-management": stateManagementTechnologyDefinitions,
	"http-client": httpClientTechnologyDefinitions,
	"api-pattern": apiPatternTechnologyDefinitions,
	"analytics": analyticsTechnologyDefinitions,
	"monitoring-error-tracking": monitoringErrorTrackingTechnologyDefinitions,
	"dates": datesTechnologyDefinitions,
	"translations": translationsTechnologyDefinitions,
	"animation": animationTechnologyDefinitions,
	"form-schema-library": formSchemaLibraryTechnologyDefinitions,
	"table-library": tableLibraryTechnologyDefinitions,
	"component-library": componentLibraryTechnologyDefinitions,
	"platform-cms-builder": platformCmsBuilderTechnologyDefinitions,
	"advertising-paid-media": advertisingPaidMediaTechnologyDefinitions,
	"experimentation-optimization": experimentationOptimizationTechnologyDefinitions,
	"accessibility": accessibilityTechnologyDefinitions,
	"business-tools": businessToolsTechnologyDefinitions,
	"booking-scheduling": bookingSchedulingTechnologyDefinitions,
	"authentication-identity": authenticationIdentityTechnologyDefinitions,
	"privacy-compliance": privacyComplianceTechnologyDefinitions,
	"security": securityTechnologyDefinitions,
	"commerce-operations": commerceOperationsTechnologyDefinitions,
	"ecommerce-extensions": ecommerceExtensionsTechnologyDefinitions,
	"wordpress-ecosystem": wordpressEcosystemTechnologyDefinitions,
	"content-publishing": contentPublishingTechnologyDefinitions,
	"community-ugc": communityUgcTechnologyDefinitions,
	"search": searchTechnologyDefinitions,
	"rich-text-editors": richTextEditorsTechnologyDefinitions,
	"email-messaging": emailMessagingTechnologyDefinitions,
	"marketing-automation": marketingAutomationTechnologyDefinitions,
	"tag-management": tagManagementTechnologyDefinitions,
	"surveys-feedback": surveysFeedbackTechnologyDefinitions,
	"maps-location": mapsLocationTechnologyDefinitions,
	"media-video": mediaVideoTechnologyDefinitions,
	"infrastructure-hosting": infrastructureHostingTechnologyDefinitions,
	"server-runtime-infra": serverRuntimeInfraTechnologyDefinitions,
	"network-hardware": networkHardwareTechnologyDefinitions,
	"mobile": mobileTechnologyDefinitions,
	"developer-tooling": developerToolingTechnologyDefinitions,
	"graphics-visualization": graphicsVisualizationTechnologyDefinitions,
	"widgets-misc": widgetsMiscTechnologyDefinitions,
	"domain-parking": domainParkingTechnologyDefinitions,
	"fundraising-donations": fundraisingDonationsTechnologyDefinitions,
} as const satisfies Partial<Record<CategoryId, readonly TechnologyDefinition[]>>;

const baseGeneratedTechnologyDefinitions: readonly TechnologyDefinition[] = Object.values(technologyDefinitionsByCategory).flat();

export const generatedTechnologyDefinitions = mergeTechnologyDefinitions(baseGeneratedTechnologyDefinitions);

/** Merge fragments by stable technology ID; the first owns display identity while later fragments add rules and fill missing metadata. */
function mergeTechnologyDefinitions(definitions: readonly TechnologyDefinition[]): TechnologyDefinition[] {
	const merged = new Map<string, TechnologyDefinition>();

	for (const definition of definitions) {
		const existing = merged.get(definition.id);
		if (!existing) {
			merged.set(definition.id, {
				...definition,
				categories: [...definition.categories],
				rules: [...definition.rules],
				...(definition.implies ? { implies: [...definition.implies] } : {}),
				...(definition.requires ? { requires: [...definition.requires] } : {}),
				...(definition.excludes ? { excludes: [...definition.excludes] } : {}),
				...(definition.relationships ? { relationships: [...definition.relationships] } : {}),
			});
			continue;
		}

		const implies = mergeOptionalStrings(existing.implies, definition.implies);
		const requires = mergeOptionalStrings(existing.requires, definition.requires);
		const excludes = mergeOptionalStrings(existing.excludes, definition.excludes);
		const metadata = mergeMetadata(existing.metadata, definition.metadata);
		// The first fragment owns the display identity. Later fragments only fill
		// fields it left empty, so a CPE or icon authored once is not lost.
		const description = existing.description ?? definition.description;
		const icon = existing.icon ?? definition.icon;
		const versioning = existing.versioning ?? definition.versioning;
		const component = existing.component ?? definition.component;
		merged.set(definition.id, {
			...existing,
			...(description ? { description } : {}),
			...(icon ? { icon } : {}),
			...(metadata ? { metadata } : {}),
			...(versioning ? { versioning } : {}),
			...(component ? { component } : {}),
			categories: uniqueValues([...existing.categories, ...definition.categories]),
			rules: mergeRules(existing.rules, definition.rules),
			...(implies ? { implies } : {}),
			...(requires ? { requires } : {}),
			...(excludes ? { excludes } : {}),
			...(definition.relationships
				? { relationships: [...(existing.relationships ?? []), ...definition.relationships] }
				: {}),
		});
	}

	return Array.from(merged.values());
}

/** Retain existing rule order and append only incoming rules with a new semantic signature. */
function mergeRules(existingRules: readonly DetectionRule[], incomingRules: readonly DetectionRule[]): DetectionRule[] {
	const signatures = new Set(existingRules.map(ruleSignature));
	const merged = [...existingRules];

	for (const rule of incomingRules) {
		const signature = ruleSignature(rule);
		if (signatures.has(signature)) {
			continue;
		}
		signatures.add(signature);
		merged.push(rule);
	}

	return merged;
}

/** Merge descriptive metadata without discarding a later fragment's CPE, pricing, or booleans. */
function mergeMetadata(
	existing: TechnologyDefinition['metadata'],
	incoming: TechnologyDefinition['metadata'],
): TechnologyDefinition['metadata'] {
	if (!existing) return incoming;
	if (!incoming) return existing;
	const saas = existing.saas ?? incoming.saas;
	const oss = existing.oss ?? incoming.oss;
	const cpe = existing.cpe ?? incoming.cpe;
	const pricing = mergeOptionalStrings(existing.pricing, incoming.pricing);
	return {
		...(saas !== undefined ? { saas } : {}),
		...(oss !== undefined ? { oss } : {}),
		...(pricing ? { pricing } : {}),
		...(cpe ? { cpe } : {}),
	};
}

/** Merge relationship IDs in first-seen order, retaining absence when both inputs are empty. */
function mergeOptionalStrings(
	existing: readonly string[] | undefined,
	incoming: readonly string[] | undefined,
): string[] | undefined {
	if (!existing?.length && !incoming?.length) {
		return undefined;
	}
	return uniqueValues([...(existing ?? []), ...(incoming ?? [])]);
}

/** Preserve first-seen order while removing repeated category or relationship values. */
function uniqueValues<T>(values: readonly T[]): T[] {
	return Array.from(new Set(values));
}

/** Identify matching behavior from kind, patterns and selector/key constraints, independent of display descriptions and confidence metadata. */
function ruleSignature(rule: DetectionRule): string {
	const pattern = 'pattern' in rule && rule.pattern ? `${rule.pattern.source}/${rule.pattern.flags}` : '';
	const valuePattern = 'valuePattern' in rule && rule.valuePattern ? `${rule.valuePattern.source}/${rule.valuePattern.flags}` : '';
	const keyPattern = 'keyPattern' in rule && rule.keyPattern ? `${rule.keyPattern.source}/${rule.keyPattern.flags}` : '';
	const hrefPattern = 'hrefPattern' in rule && rule.hrefPattern ? `${rule.hrefPattern.source}/${rule.hrefPattern.flags}` : '';
	const typePattern = 'typePattern' in rule && rule.typePattern ? `${rule.typePattern.source}/${rule.typePattern.flags}` : '';
	const hreflangPattern = 'hreflangPattern' in rule && rule.hreflangPattern ? `${rule.hreflangPattern.source}/${rule.hreflangPattern.flags}` : '';
	const mediaPattern = 'mediaPattern' in rule && rule.mediaPattern ? `${rule.mediaPattern.source}/${rule.mediaPattern.flags}` : '';

	return JSON.stringify({
		kind: rule.kind,
		pattern,
		valuePattern,
		keyPattern,
		hrefPattern,
		typePattern,
		hreflangPattern,
		mediaPattern,
		selector: 'selector' in rule ? rule.selector : undefined,
		attribute: 'attribute' in rule ? rule.attribute : undefined,
		property: 'property' in rule ? rule.property : undefined,
		key: 'key' in rule ? rule.key : undefined,
		rel: 'rel' in rule ? rule.rel : undefined,
		as: 'as' in rule ? rule.as : undefined,
		recordType: 'recordType' in rule ? rule.recordType : undefined,
		area: 'area' in rule ? rule.area : undefined,
	});
}
