import type { TechnologyDefinition } from '../../types';

export const narrativTechnologyDefinition = {
	id: "narrativ",
	name: "Narrativ",
	website: "https://narrativ.com/",
	description: "Narrativ is a subscription technology platform for brands to acquire new customers through trusted creators.",
	icon: "Narrativ.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "narrativ:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.narrativ\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
