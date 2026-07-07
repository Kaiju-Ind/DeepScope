import type { TechnologyDefinition } from '../../types';

export const lightspeedVtTechnologyDefinition = {
	id: "lightspeed-vt",
	name: "LightSpeed VT",
	website: "https://lightspeedvt.com",
	description: "LightSpeed VT is a learning management system designed to deliver, track, and manage educational courses and training programs.",
	icon: "LightSPeedVT.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "lightspeed-vt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lightspeedvt\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
