import type { TechnologyDefinition } from '../../types';

export const vvvebCmsTechnologyDefinition = {
	id: "vvveb-cms",
	name: "Vvveb CMS",
	website: "https://www.vvveb.com",
	description: "Vvveb CMS is user-friendly software for building professional websites, blogs, and ecommerce stores.",
	icon: "Vvveb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vvveb-cms:jsGlobal:0",
			kind: "jsGlobal",
			property: "VvvebTheme",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vvveb-cms:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Vvveb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vvveb-cms:meta:2",
			kind: "meta",
			key: "name",
			valuePattern: new RegExp("^Vvveb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vvveb-cms:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^vvveb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vvveb-cms:meta:4",
			kind: "meta",
			key: "name",
			valuePattern: new RegExp("^vvveb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:vvveb:vvveb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
