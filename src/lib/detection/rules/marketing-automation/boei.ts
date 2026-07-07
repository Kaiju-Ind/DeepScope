import type { TechnologyDefinition } from '../../types';

export const boeiTechnologyDefinition = {
	id: "boei",
	name: "Boei",
	website: "https://boei.help",
	description: "Boei is a platform that uses AI to capture leads and engage website visitors.",
	icon: "Boei.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "boei:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.boei\\.help"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boei:jsGlobal:1",
			kind: "jsGlobal",
			property: "Boei",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boei:jsGlobal:2",
			kind: "jsGlobal",
			property: "BoeiWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
