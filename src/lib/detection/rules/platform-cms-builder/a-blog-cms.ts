import type { TechnologyDefinition } from '../../types';

export const aBlogCmsTechnologyDefinition = {
	id: "a-blog-cms",
	name: "a-blog cms",
	website: "https://www.a-blogcms.jp",
	icon: "a-blog cms.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "a-blog-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("a-blog cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
