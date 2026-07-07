import type { TechnologyDefinition } from '../../types';

export const foxyIoTechnologyDefinition = {
	id: "foxy-io",
	name: "Foxy.io",
	website: "https://www.foxy.io",
	description: "Foxy’s hosted cart & payment page allow you to sell anything, using your existing website or platform.",
	icon: "foxyio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "foxy-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.foxycart\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
