import type { TechnologyDefinition } from '../../types';

export const azkoCmsTechnologyDefinition = {
	id: "azko-cms",
	name: "Azko CMS",
	website: "https://www.azko.fr",
	description: "Azko CMS is a content management system developed by Azko (Septeo Group) specifically launched for lawyers in France.",
	icon: "Azko CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "azko-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/js\\.fw\\.azko\\.fr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"bootstrap",
		"slick",
	],
} as const satisfies TechnologyDefinition;
