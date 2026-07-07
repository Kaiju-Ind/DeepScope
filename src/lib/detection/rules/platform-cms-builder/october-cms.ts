import type { TechnologyDefinition } from '../../types';

export const octoberCmsTechnologyDefinition = {
	id: "october-cms",
	name: "October CMS",
	website: "https://octobercms.com",
	description: "October is a free, open-source, self-hosted CMS platform based on the Laravel PHP Framework.",
	icon: "October CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "october-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "ocJSON",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "october-cms:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^october_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "october-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("OctoberCMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "october-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("octobercms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:octobercms:october:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
