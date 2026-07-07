import type { TechnologyDefinition } from '../../types';

export const districtMTechnologyDefinition = {
	id: "district-m",
	name: "District M",
	website: "https://districtm.net",
	description: "District M is a programmatic advertising exchange.",
	icon: "District M.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "district-m:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.districtm\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "district-m:dom:1",
			kind: "dom",
			selector: "iframe[src*='.districtm.io']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
