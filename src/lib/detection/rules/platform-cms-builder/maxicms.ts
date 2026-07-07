import type { TechnologyDefinition } from '../../types';

export const maxicmsTechnologyDefinition = {
	id: "maxicms",
	name: "MaxiCMS",
	website: "https://www.maxicms.nl",
	description: "MaxiCMS is a content management system (CMS) that allows website owners to manage and update content independently.",
	icon: "MaxiCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maxicms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.maxicms\\.nl"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
