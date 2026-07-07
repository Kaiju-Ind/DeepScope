import type { TechnologyDefinition } from '../../types';

export const lovinglyTechnologyDefinition = {
	id: "lovingly",
	name: "Lovingly",
	website: "https://www.lovingly.com",
	description: "Lovingly is a florist website resource builder that provides tools for creating and managing online floral business platforms.",
	icon: "Lovingly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lovingly:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.lovingly\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
