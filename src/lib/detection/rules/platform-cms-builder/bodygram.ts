import type { TechnologyDefinition } from '../../types';

export const bodygramTechnologyDefinition = {
	id: "bodygram",
	name: "Bodygram",
	website: "https://bodygram.com",
	description: "Bodygram is a tool for obtaining body measurements, allowing businesses to tailor products and services to customers at scale.",
	icon: "Bodygram.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bodygram:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bodygram\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bodygram:jsGlobal:1",
			kind: "jsGlobal",
			property: "Body2FitWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
