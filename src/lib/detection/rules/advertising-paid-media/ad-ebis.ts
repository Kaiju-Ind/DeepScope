import type { TechnologyDefinition } from '../../types';

export const adEbisTechnologyDefinition = {
	id: "ad-ebis",
	name: "AD EBiS",
	website: "https://www.ebis.ne.jp",
	description: "AD EBiS is an advertising and marketing platform that offers advertisement effectiveness measurement, access and user analysis.",
	icon: "ebis.png",
	categories: [
		"advertising-paid-media",
		"marketing-automation",
	],
	rules: [
		{
			id: "ad-ebis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ebis\\.ne\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ad-ebis:dom:1",
			kind: "dom",
			selector: "a[href*='.ebis.ne.jp/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ad-ebis:jsGlobal:2",
			kind: "jsGlobal",
			property: "ebis.c.pageurl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
