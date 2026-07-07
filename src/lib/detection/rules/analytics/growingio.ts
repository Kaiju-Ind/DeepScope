import type { TechnologyDefinition } from '../../types';

export const growingioTechnologyDefinition = {
	id: "growingio",
	name: "GrowingIO",
	website: "https://www.growingio.com/",
	icon: "GrowingIO.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "growingio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.growingio\\.com\\/([\\d.]+)\\/gio\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "growingio:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^gr_user_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "growingio:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^grwng_uid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
