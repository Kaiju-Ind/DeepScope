import type { TechnologyDefinition } from '../../types';

export const pubfunnelsTechnologyDefinition = {
	id: "pubfunnels",
	name: "Pubfunnels",
	website: "https://pubfunnels.com",
	description: "Pubfunnels is a business hub designed for publishers and authors to manage, promote, and grow their publishing operations.",
	icon: "Pubfunnels.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pubfunnels:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.pubfunnels\\.com"),
			description: "Script content contains a bounded technology signature.",
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
