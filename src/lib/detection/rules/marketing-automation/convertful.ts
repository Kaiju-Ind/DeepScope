import type { TechnologyDefinition } from '../../types';

export const convertfulTechnologyDefinition = {
	id: "convertful",
	name: "Convertful",
	website: "https://convertful.com",
	description: "Convertful is a tool that automates conversions by turning website traffic into leads and sales in real time.",
	icon: "Convertful.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "convertful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.convertful\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertful:jsGlobal:1",
			kind: "jsGlobal",
			property: "Convertful.$containers",
			description: "Page-owned global matches a known technology marker.",
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
