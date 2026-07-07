import type { TechnologyDefinition } from '../../types';

export const winterCmsTechnologyDefinition = {
	id: "winter-cms",
	name: "Winter CMS",
	website: "https://wintercms.com",
	description: "Winter CMS is an open source content management framework built on the Laravel PHP framework for rapid development.",
	icon: "WinterCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "winter-cms:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Winter CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "winter-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Winter CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "winter-cms:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^winter cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "winter-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^winter cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:wintercms:winter:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
