import type { TechnologyDefinition } from '../../types';

export const tikiWikiCmsGroupwareTechnologyDefinition = {
	id: "tiki-wiki-cms-groupware",
	name: "Tiki Wiki CMS Groupware",
	website: "https://tiki.org",
	description: "Tiki Wiki is a free and open-source wiki-based content management system and online office suite written primarily in PHP.",
	icon: "Tiki Wiki CMS Groupware.png",
	categories: [
		"platform-cms-builder",
		"community-ugc",
		"content-publishing",
		"developer-tooling",
	],
	rules: [
		{
			id: "tiki-wiki-cms-groupware:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/|_)tiki"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tiki-wiki-cms-groupware:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Tiki", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tiki-wiki-cms-groupware:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^tiki", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:tiki:tikiwiki_cms\\/groupware:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
