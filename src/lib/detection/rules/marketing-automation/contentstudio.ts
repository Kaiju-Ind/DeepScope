import type { TechnologyDefinition } from '../../types';

export const contentstudioTechnologyDefinition = {
	id: "contentstudio",
	name: "ContentStudio",
	website: "https://contentstudio.io",
	description: "ContentStudio is an integrated cloud-based social media management and content marketing solution.",
	icon: "ContentStudio.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contentstudio:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/contentstudio']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
