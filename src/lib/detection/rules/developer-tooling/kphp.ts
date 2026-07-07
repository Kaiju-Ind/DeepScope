import type { TechnologyDefinition } from '../../types';

export const kphpTechnologyDefinition = {
	id: "kphp",
	name: "KPHP",
	website: "https://vkcom.github.io/kphp",
	description: "KPHP (kPHP or KittenPHP) is a free PHP-to- C++ source-to-source translator, developed by VKontakte.",
	icon: "default.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "kphp:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^KPHP\\/([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kphp:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^kphp\\/([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
