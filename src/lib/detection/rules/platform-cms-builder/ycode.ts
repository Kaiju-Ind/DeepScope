import type { TechnologyDefinition } from '../../types';

export const ycodeTechnologyDefinition = {
	id: "ycode",
	name: "Ycode",
	website: "https://www.ycode.com",
	description: "Ycode is a no-code development platform that allows users to create web and mobile applications without any coding skills.",
	icon: "Ycode.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ycode:dom:0",
			kind: "dom",
			selector: "link[href*='.ycodeapp.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
