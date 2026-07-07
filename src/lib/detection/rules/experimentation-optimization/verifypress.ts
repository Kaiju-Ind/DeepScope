import type { TechnologyDefinition } from '../../types';

export const verifypressTechnologyDefinition = {
	id: "verifypress",
	name: "VerifyPress",
	website: "https://verifypress.com",
	description: "VerifyPress is a social proof app that enables implementation of pop-up notifications, HelloBar alerts, and social proof elements using a single line of code.",
	icon: "VerifyPress.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "verifypress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.verifypress\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "verifypress:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.verifypress\\.com"),
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
