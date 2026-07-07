import type { TechnologyDefinition } from '../../types';

export const kitCmsTechnologyDefinition = {
	id: "kit-cms",
	name: "KIT CMS",
	website: "https://www.kontrolit.net",
	description: "KIT CMS is a .NET-based content management system created by Kontrolit.net for building and managing dynamic websites and digital content.",
	icon: "KITCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kit-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Kontrolit KIT CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kit-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^kontrolit kit cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
