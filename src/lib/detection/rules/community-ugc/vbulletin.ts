import type { TechnologyDefinition } from '../../types';

export const vbulletinTechnologyDefinition = {
	id: "vbulletin",
	name: "vBulletin",
	website: "https://www.vbulletin.com",
	description: "vBulletin is tool that is used to create and manage online forums or discussion boards. It is written in PHP and uses a MySQL database server.",
	icon: "vBulletin.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vbulletin:html:0",
			kind: "html",
			pattern: new RegExp("<div id=\"copyright\">Powered by vBulletin"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vbulletin:jsGlobal:1",
			kind: "jsGlobal",
			property: "vBulletin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vbulletin:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^bblastactivity$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vbulletin:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^bblastvisit$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vbulletin:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^bbsessionhash$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vbulletin:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("vBulletin ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vbulletin:html:6",
			kind: "html",
			pattern: new RegExp("<div id=\"copyright\">powered by vbulletin"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vbulletin:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("vbulletin ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:vbulletin:vbulletin:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
