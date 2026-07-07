import type { TechnologyDefinition } from '../../types';

export const koobooCmsTechnologyDefinition = {
	id: "kooboo-cms",
	name: "Kooboo CMS",
	website: "https://kooboo.com",
	description: "Kooboo is a content management system (CMS) and web development framework used for building and managing websites and web applications.",
	icon: "Kooboo CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kooboo-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Kooboo"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kooboo-cms:header:1",
			kind: "header",
			key: "X-KoobooCMS-Version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kooboo-cms:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/kooboo"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kooboo-cms:header:3",
			kind: "header",
			key: "x-kooboocms-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:kooboo:kooboo_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
