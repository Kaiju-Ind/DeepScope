import type { TechnologyDefinition } from '../../types';

export const postnlTechnologyDefinition = {
	id: "postnl",
	name: "PostNL",
	website: "https://postnl.post",
	description: "PostNL (formerly TNT) is a mail, parcel and ecommerce corporation with operations in the Netherlands, Germany, Italy, Belgium, and the United Kingdom.",
	icon: "PostNL.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "postnl:text:0",
			kind: "text",
			pattern: new RegExp("\\bPostNL\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "postnl:dom:1",
			kind: "dom",
			selector: "img[alt*='postnl' i], img[src*='postnl' i]",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
