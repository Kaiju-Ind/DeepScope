import type { CategoryId, DetectionRule, TechnologyDefinition } from '../types';
export { SOURCE_LIMITS } from '../source-limits';
import { frameworkTechnologyDefinitions } from './framework';
import { uiLibraryTechnologyDefinitions } from './ui-library';
import { routerTechnologyDefinitions } from './router';
import { bundlerTechnologyDefinitions } from './bundler';
import { transpilerTechnologyDefinitions } from './transpiler';
import { minifierTechnologyDefinitions } from './minifier';
import { moduleFormatTechnologyDefinitions } from './module-format';
import { stylingLibraryTechnologyDefinitions } from './styling-library';
import { stylingProcessorTechnologyDefinitions } from './styling-processor';
import { stateManagementTechnologyDefinitions } from './state-management';
import { httpClientTechnologyDefinitions } from './http-client';
import { apiPatternTechnologyDefinitions } from './api-pattern';
import { analyticsTechnologyDefinitions } from './analytics';
import { monitoringErrorTrackingTechnologyDefinitions } from './monitoring-error-tracking';
import { datesTechnologyDefinitions } from './dates';
import { translationsTechnologyDefinitions } from './translations';
import { animationTechnologyDefinitions } from './animation';
import { formSchemaLibraryTechnologyDefinitions } from './form-schema-library';
import { tableLibraryTechnologyDefinitions } from './table-library';
import { componentLibraryTechnologyDefinitions } from './component-library';
import { platformCmsBuilderTechnologyDefinitions } from './platform-cms-builder';
import { advertisingPaidMediaTechnologyDefinitions } from './advertising-paid-media';
import { experimentationOptimizationTechnologyDefinitions } from './experimentation-optimization';
import { accessibilityTechnologyDefinitions } from './accessibility';
import { businessToolsTechnologyDefinitions } from './business-tools';
import { bookingSchedulingTechnologyDefinitions } from './booking-scheduling';
import { authenticationIdentityTechnologyDefinitions } from './authentication-identity';
import { privacyComplianceTechnologyDefinitions } from './privacy-compliance';
import { securityTechnologyDefinitions } from './security';
import { commerceOperationsTechnologyDefinitions } from './commerce-operations';
import { ecommerceExtensionsTechnologyDefinitions } from './ecommerce-extensions';
import { wordpressEcosystemTechnologyDefinitions } from './wordpress-ecosystem';
import { contentPublishingTechnologyDefinitions } from './content-publishing';
import { communityUgcTechnologyDefinitions } from './community-ugc';
import { searchTechnologyDefinitions } from './search';
import { richTextEditorsTechnologyDefinitions } from './rich-text-editors';
import { emailMessagingTechnologyDefinitions } from './email-messaging';
import { marketingAutomationTechnologyDefinitions } from './marketing-automation';
import { tagManagementTechnologyDefinitions } from './tag-management';
import { surveysFeedbackTechnologyDefinitions } from './surveys-feedback';
import { mapsLocationTechnologyDefinitions } from './maps-location';
import { mediaVideoTechnologyDefinitions } from './media-video';
import { infrastructureHostingTechnologyDefinitions } from './infrastructure-hosting';
import { serverRuntimeInfraTechnologyDefinitions } from './server-runtime-infra';
import { networkHardwareTechnologyDefinitions } from './network-hardware';
import { mobileTechnologyDefinitions } from './mobile';
import { developerToolingTechnologyDefinitions } from './developer-tooling';
import { graphicsVisualizationTechnologyDefinitions } from './graphics-visualization';
import { widgetsMiscTechnologyDefinitions } from './widgets-misc';
import { domainParkingTechnologyDefinitions } from './domain-parking';
import { fundraisingDonationsTechnologyDefinitions } from './fundraising-donations';

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

function mergeTechnologyDefinitions(definitions: readonly TechnologyDefinition[]): TechnologyDefinition[] {
	const merged = new Map<string, TechnologyDefinition>();

	for (const definition of definitions) {
		const existing = merged.get(definition.id);
		if (!existing) {
			merged.set(definition.id, {
				...definition,
				categories: [...definition.categories],
				rules: [...definition.rules],
				implies: definition.implies ? [...definition.implies] : undefined,
				requires: definition.requires ? [...definition.requires] : undefined,
				excludes: definition.excludes ? [...definition.excludes] : undefined,
				relationships: definition.relationships ? [...definition.relationships] : undefined,
			});
			continue;
		}

		existing.categories = uniqueValues([...existing.categories, ...definition.categories]);
		existing.rules = mergeRules(existing.rules, definition.rules);
		existing.implies = mergeOptionalStrings(existing.implies, definition.implies);
		existing.requires = mergeOptionalStrings(existing.requires, definition.requires);
		existing.excludes = mergeOptionalStrings(existing.excludes, definition.excludes);
		existing.relationships = definition.relationships
			? [...(existing.relationships ?? []), ...definition.relationships]
			: existing.relationships;
	}

	return Array.from(merged.values());
}

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

function mergeOptionalStrings(
	existing: readonly string[] | undefined,
	incoming: readonly string[] | undefined,
): string[] | undefined {
	if (!existing?.length && !incoming?.length) {
		return undefined;
	}
	return uniqueValues([...(existing ?? []), ...(incoming ?? [])]);
}

function uniqueValues<T>(values: readonly T[]): T[] {
	return Array.from(new Set(values));
}

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
