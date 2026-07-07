import type { TechnologyDefinition } from '../../types';

export const sardineTechnologyDefinition = {
	id: "sardine",
	name: "Sardine",
	website: "https://www.sardine.ai",
	description: "Sardine is a system designed to stop fraud and increase revenue by enhancing transaction monitoring and risk management.",
	icon: "Sardine.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "sardine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.sardine\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
