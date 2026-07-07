import type { TechnologyDefinition } from '../../types';

export const bazaarvoiceCurationTechnologyDefinition = {
	id: "bazaarvoice-curation",
	name: "Bazaarvoice Curation",
	website: "https://www.bazaarvoice.com/products/visual-and-social-content/",
	description: "Bazaarvoice Curation is a content curation service Bazaarvoice provides post it's acquisition of Curalate.",
	icon: "Bazaarvoice.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bazaarvoice-curation:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("edge\\.curalate\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bazaarvoice-curation:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.curalate\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
