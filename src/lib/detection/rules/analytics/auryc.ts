import type { TechnologyDefinition } from '../../types';

export const aurycTechnologyDefinition = {
	id: "auryc",
	name: "Auryc",
	website: "https://www.auryc.com",
	description: "Auryc is a client-side journey intelligence platform that surfaces real-time insights.",
	icon: "Auryc.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "auryc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.auryc\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "auryc:jsGlobal:1",
			kind: "jsGlobal",
			property: "aurycJsLibConfig.base.code_version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
