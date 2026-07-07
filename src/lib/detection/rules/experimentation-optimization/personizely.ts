import type { TechnologyDefinition } from '../../types';

export const personizelyTechnologyDefinition = {
	id: "personizely",
	name: "Personizely",
	website: "https://www.personizely.net",
	description: "Personizely is a conversion marketing toolkit which helps websites and ecommerce stores better engage with visitors using website widgets and personalisation.",
	icon: "Personizely.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "personizely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.personizely\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "personizely:jsGlobal:1",
			kind: "jsGlobal",
			property: "Personizely",
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
