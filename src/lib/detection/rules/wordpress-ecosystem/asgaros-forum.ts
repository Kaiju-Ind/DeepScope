import type { TechnologyDefinition } from '../../types';

export const asgarosForumTechnologyDefinition = {
	id: "asgaros-forum",
	name: "Asgaros Forum",
	website: "https://www.asgaros.de",
	description: "Asgaros Forum is a lightweight and simple forum plugin for WordPress.",
	icon: "Asgaros Forum.png",
	categories: [
		"wordpress-ecosystem",
		"community-ugc",
	],
	rules: [
		{
			id: "asgaros-forum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/asgaros-forum\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "asgaros-forum:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/asgaros-forum/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:asgaros:asgaros_forum:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
