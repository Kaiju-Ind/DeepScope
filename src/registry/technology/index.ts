import type { CategoryId, DetectionRule, TechnologyDefinition } from '@/lib/detection/types';
export { SOURCE_LIMITS } from '../../lib/detection/source-limits.ts';
import { frameworkTechnologyDefinitions } from './catalog/framework';
import { uiLibraryTechnologyDefinitions } from './catalog/ui-library';
import { routerTechnologyDefinitions } from './catalog/router';
import { bundlerTechnologyDefinitions } from './catalog/bundler';
import { transpilerTechnologyDefinitions } from './catalog/transpiler';
import { minifierTechnologyDefinitions } from './catalog/minifier';
import { moduleFormatTechnologyDefinitions } from './catalog/module-format';
import { stylingLibraryTechnologyDefinitions } from './catalog/styling-library';
import { stylingProcessorTechnologyDefinitions } from './catalog/styling-processor';
import { stateManagementTechnologyDefinitions } from './catalog/state-management';
import { httpClientTechnologyDefinitions } from './catalog/http-client';
import { apiPatternTechnologyDefinitions } from './catalog/api-pattern';
import { analyticsTechnologyDefinitions } from './catalog/analytics';
import { monitoringErrorTrackingTechnologyDefinitions } from './catalog/monitoring-error-tracking';
import { datesTechnologyDefinitions } from './catalog/dates';
import { translationsTechnologyDefinitions } from './catalog/translations';
import { animationTechnologyDefinitions } from './catalog/animation';
import { formSchemaLibraryTechnologyDefinitions } from './catalog/form-schema-library';
import { tableLibraryTechnologyDefinitions } from './catalog/table-library';
import { componentLibraryTechnologyDefinitions } from './catalog/component-library';
import { platformCmsBuilderTechnologyDefinitions } from './catalog/platform-cms-builder';
import { advertisingPaidMediaTechnologyDefinitions } from './catalog/advertising-paid-media';
import { experimentationOptimizationTechnologyDefinitions } from './catalog/experimentation-optimization';
import { accessibilityTechnologyDefinitions } from './catalog/accessibility';
import { businessToolsTechnologyDefinitions } from './catalog/business-tools';
import { bookingSchedulingTechnologyDefinitions } from './catalog/booking-scheduling';
import { authenticationIdentityTechnologyDefinitions } from './catalog/authentication-identity';
import { privacyComplianceTechnologyDefinitions } from './catalog/privacy-compliance';
import { securityTechnologyDefinitions } from './catalog/security';
import { commerceOperationsTechnologyDefinitions } from './catalog/commerce-operations';
import { ecommerceExtensionsTechnologyDefinitions } from './catalog/ecommerce-extensions';
import { wordpressEcosystemTechnologyDefinitions } from './catalog/wordpress-ecosystem';
import { contentPublishingTechnologyDefinitions } from './catalog/content-publishing';
import { communityUgcTechnologyDefinitions } from './catalog/community-ugc';
import { searchTechnologyDefinitions } from './catalog/search';
import { richTextEditorsTechnologyDefinitions } from './catalog/rich-text-editors';
import { emailMessagingTechnologyDefinitions } from './catalog/email-messaging';
import { marketingAutomationTechnologyDefinitions } from './catalog/marketing-automation';
import { tagManagementTechnologyDefinitions } from './catalog/tag-management';
import { surveysFeedbackTechnologyDefinitions } from './catalog/surveys-feedback';
import { mapsLocationTechnologyDefinitions } from './catalog/maps-location';
import { mediaVideoTechnologyDefinitions } from './catalog/media-video';
import { infrastructureHostingTechnologyDefinitions } from './catalog/infrastructure-hosting';
import { serverRuntimeInfraTechnologyDefinitions } from './catalog/server-runtime-infra';
import { networkHardwareTechnologyDefinitions } from './catalog/network-hardware';
import { mobileTechnologyDefinitions } from './catalog/mobile';
import { developerToolingTechnologyDefinitions } from './catalog/developer-tooling';
import { graphicsVisualizationTechnologyDefinitions } from './catalog/graphics-visualization';
import { widgetsMiscTechnologyDefinitions } from './catalog/widgets-misc';
import { domainParkingTechnologyDefinitions } from './catalog/domain-parking';
import { fundraisingDonationsTechnologyDefinitions } from './catalog/fundraising-donations';

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
		merged.set(definition.id, {
			...existing,
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
