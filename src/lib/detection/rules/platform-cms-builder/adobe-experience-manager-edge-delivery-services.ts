import type { TechnologyDefinition } from '../../types';

export const adobeExperienceManagerEdgeDeliveryServicesTechnologyDefinition = {
	id: "adobe-experience-manager-edge-delivery-services",
	name: "Adobe Experience Manager Edge Delivery Services",
	website: "https://www.aem.live",
	description: "Edge Delivery Services in Adobe Experience Manager Sites as a Cloud Service, also know as Helix, Franklin, Next-Generation Composability is a fast and lightweight content management system from Adobe.",
	icon: "Adobe Experience Platform.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adobe-experience-manager-edge-delivery-services:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^.+\\/scripts\\/aem\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager-edge-delivery-services:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("^.+\\/scripts\\/lib-franklin\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:adobe:experience_manager:*:*:*:*:*:*:*:*",
	},
	excludes: [
		"adobe-experience-manager",
	],
} as const satisfies TechnologyDefinition;
