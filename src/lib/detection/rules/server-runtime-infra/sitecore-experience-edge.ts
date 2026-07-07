import type { TechnologyDefinition } from '../../types';

export const sitecoreExperienceEdgeTechnologyDefinition = {
	id: "sitecore-experience-edge",
	name: "Sitecore Experience Edge",
	website: "https://doc.sitecore.com/xp/en/developers/101/developer-tools/experience-edge-for-xm-apis.html",
	description: "Sitecore Experience Edge is a product that optimises content delivery by utilising edge computing and caching technologies to enhance website performance and user experience.",
	icon: "Sitecore.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "sitecore-experience-edge:dom:0",
			kind: "dom",
			selector: "img[src*='edge.sitecorecloud.io']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
	implies: [
		"graphql",
		"sitecore-experience-platform",
	],
} as const satisfies TechnologyDefinition;
