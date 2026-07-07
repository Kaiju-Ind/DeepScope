import type { TechnologyDefinition } from '../../types';

export const lerentoolsTechnologyDefinition = {
	id: "lerentools",
	name: "LerenTools",
	website: "https://lerentools.com",
	description: "LerenTools is a suite of Tiendanube storefront apps for badges, preorder flows, business rules, and related merchandising features.",
	icon: "LerenTools.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lerentools:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps-scripts\\.tiendanube\\.com\\/[^?#]*lerentools\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lerentools:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.lerentools\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
