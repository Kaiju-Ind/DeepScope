import type { TechnologyDefinition } from '../../types';

export const kmkTechnologyDefinition = {
	id: "kmk",
	name: "KMK",
	website: "https://www.kmk.net.tr",
	description: "KMK is a company that offers ecommerce software technology in C2C, B2B, B2C areas.",
	icon: "KMK.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kmk:dom:0",
			kind: "dom",
			selector: "a[href*='.kmk.net.tr/'][target='_blank'], div#kmkCopyright",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kmk:dns:1",
			kind: "dns",
			valuePattern: new RegExp("ns\\d\\.kmkhosting\\.net", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "kmk:dns:2",
			kind: "dns",
			valuePattern: new RegExp("ns\\d\\.kmkhosting\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
