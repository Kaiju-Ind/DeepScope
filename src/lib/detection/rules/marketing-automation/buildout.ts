import type { TechnologyDefinition } from '../../types';

export const buildoutTechnologyDefinition = {
	id: "buildout",
	name: "Buildout",
	website: "https://www.buildout.com",
	description: "Buildout is a marketing platform focused on commercial real estate listings, analytics, and promotional workflows for brokers, landlords, and property teams.",
	icon: "Buildout.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "buildout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/buildout\\.com\\/api\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buildout:jsGlobal:1",
			kind: "jsGlobal",
			property: "BuildOut.embed",
			description: "Page-owned global matches a known technology marker.",
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
