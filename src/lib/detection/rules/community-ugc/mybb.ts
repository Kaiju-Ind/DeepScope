import type { TechnologyDefinition } from '../../types';

export const mybbTechnologyDefinition = {
	id: "mybb",
	name: "MyBB",
	website: "https://mybb.com",
	description: "MyBB is a free and open-source forum software written in PHP.",
	icon: "MyBB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "mybb:jsGlobal:0",
			kind: "jsGlobal",
			property: "MyBB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mybb:jsGlobal:1",
			kind: "jsGlobal",
			property: "MyBBEditor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mybb:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^mybb\\[lastactive\\]$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "mybb:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^mybb\\[lastvisit\\]$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mybb:mybb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
