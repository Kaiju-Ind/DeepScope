import type { TechnologyDefinition } from '../../types';

export const postachTechnologyDefinition = {
	id: "postach",
	name: "Postach",
	website: "https://postach.io",
	description: "Postach is a blogging platform integrated with Evernote, allowing users to create and manage blog posts directly from their Evernote account.",
	icon: "Postach.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "postach:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.postach\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
