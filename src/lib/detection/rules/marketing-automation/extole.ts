import type { TechnologyDefinition } from '../../types';

export const extoleTechnologyDefinition = {
	id: "extole",
	name: "Extole",
	website: "https://www.extole.com",
	description: "Extole is an online marketing platform that enables brands and businesses to get new customers through loyalty and referral programs.",
	icon: "Extole.png",
	categories: [
		"marketing-automation",
		"commerce-operations",
	],
	rules: [
		{
			id: "extole:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:extole|xtlo)\\.(?:com|net)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extole:dom:1",
			kind: "dom",
			selector: "li > a[href*='.extole.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "extole:jsGlobal:2",
			kind: "jsGlobal",
			property: "extole.VERSION",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
