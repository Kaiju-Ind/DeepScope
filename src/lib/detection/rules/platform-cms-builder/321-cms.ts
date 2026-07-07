import type { TechnologyDefinition } from '../../types';

export const technology321CmsTechnologyDefinition = {
	id: "321-cms",
	name: "321 CMS",
	website: "https://www.321web.cz",
	description: "321 CMS is a content management system that enables users to create and manage websites without requiring coding knowledge.",
	icon: "321CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "321-cms:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^321 CREATIVE CREW", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "321-cms:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^321 creative crew", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
