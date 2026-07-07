import type { TechnologyDefinition } from '../../types';

export const regulaTechnologyDefinition = {
	id: "regula",
	name: "Regula",
	website: "https://regulaforensics.com",
	description: "Regula is a provider of identity verification and document authentication solutions for various industries.",
	icon: "Regula.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "regula:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg\\.com\\/@regulaforensics\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "regula:jsGlobal:1",
			kind: "jsGlobal",
			property: "Regula.AuthenticityResultType",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"unpkg",
	],
} as const satisfies TechnologyDefinition;
