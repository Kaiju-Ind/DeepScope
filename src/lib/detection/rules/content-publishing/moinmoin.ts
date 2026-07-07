import type { TechnologyDefinition } from '../../types';

export const moinmoinTechnologyDefinition = {
	id: "moinmoin",
	name: "MoinMoin",
	website: "https://moinmo.in",
	description: "MoinMoin is a wiki engine implemented in Python.",
	icon: "MoinMoin.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "moinmoin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moin(?:_static(\\d)(\\d)(\\d)|.+)\\/common\\/js\\/common\\.js"),
			version: {
				source: "match",
				template: "$1.$2.$3",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moinmoin:jsGlobal:1",
			kind: "jsGlobal",
			property: "show_switch2gui",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moinmoin:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^MOIN_SESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "moinmoin:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^moin_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:moinmo:moinmoin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
