import type { TechnologyDefinition } from '../../types';

export const arasttaTechnologyDefinition = {
	id: "arastta",
	name: "Arastta",
	website: "https://arastta.org",
	description: "Arastta is a free and open-source project with contributors from all over the world.",
	icon: "Arastta.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "arastta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("arastta\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arastta:header:1",
			kind: "header",
			key: "Arastta",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arastta:header:2",
			kind: "header",
			key: "arastta",
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
		cpe: "cpe:2.3:a:arastta:ecommerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
	excludes: [
		"opencart",
	],
} as const satisfies TechnologyDefinition;
