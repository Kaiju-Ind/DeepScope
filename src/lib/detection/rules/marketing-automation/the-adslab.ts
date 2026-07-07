import type { TechnologyDefinition } from '../../types';

export const theAdslabTechnologyDefinition = {
	id: "the-adslab",
	name: "The AdsLab",
	website: "https://www.theadslab.io",
	description: "The AdsLab is a tool that enables users to target, track, and convert their desired audience effectively.",
	icon: "TheAdsLab.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "the-adslab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.theadslab\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
