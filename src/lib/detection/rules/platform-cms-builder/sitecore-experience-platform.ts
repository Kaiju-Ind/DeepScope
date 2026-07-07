import type { TechnologyDefinition } from '../../types';

export const sitecoreExperiencePlatformTechnologyDefinition = {
	id: "sitecore-experience-platform",
	name: "Sitecore Experience Platform",
	website: "https://www.sitecore.com/products/sitecore-experience-platform",
	description: "Sitecore Experience Platform is a digital platform used by businesses to create, manage, and deliver personalised content and experiences to users across different channels.",
	icon: "Sitecore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
