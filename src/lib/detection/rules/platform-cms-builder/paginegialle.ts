import type { TechnologyDefinition } from '../../types';

export const paginegialleTechnologyDefinition = {
	id: "paginegialle",
	name: "PagineGialle",
	website: "https://www.paginegialle.it",
	description: "PagineGialle is a business website builder by ItaliaOnline that enables Italian businesses to create and manage professional websites and establish an online presence.",
	icon: "PagineGialle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "paginegialle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ssc\\.paginegialle\\.it\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
