import type { TechnologyDefinition } from '../../types';

export const feefoTechnologyDefinition = {
	id: "feefo",
	name: "Feefo",
	website: "https://www.feefo.com",
	description: "Feefo is a cloud-based consumer review and rating management software.",
	icon: "Feefo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "feefo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.feefo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "feefo:dom:1",
			kind: "dom",
			selector: "a[href*='.feefo.com/'][target='_blank'], link[href*='.feefo.com/'], img[src*='.feefo.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "feefo:jsGlobal:2",
			kind: "jsGlobal",
			property: "feefoTracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "feefo:jsGlobal:3",
			kind: "jsGlobal",
			property: "feefoWidget",
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
