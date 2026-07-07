import type { TechnologyDefinition } from '../../types';

export const whitelabelMdTechnologyDefinition = {
	id: "whitelabel-md",
	name: "Whitelabel MD",
	website: "https://whitelabelmd.com",
	description: "White Label MD is a platform for creating ecommerce telemedicine websites with on-demand prescription fulfillment capabilities.",
	icon: "WhitelabelMD.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "whitelabel-md:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.whitelabelmd\\.com"),
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
