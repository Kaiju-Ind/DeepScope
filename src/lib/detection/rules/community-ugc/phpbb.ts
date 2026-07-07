import type { TechnologyDefinition } from '../../types';

export const phpbbTechnologyDefinition = {
	id: "phpbb",
	name: "phpBB",
	website: "https://phpbb.com",
	description: "phpBB is a free open-source Internet forum package in the PHP scripting language.",
	icon: "phpBB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "phpbb:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a[^>]+phpBB"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:html:1",
			kind: "html",
			pattern: new RegExp("<div class=phpbb_copyright>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:html:2",
			kind: "html",
			pattern: new RegExp("<[^>]+styles\\/(?:sub|pro)silver\\/theme"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:html:3",
			kind: "html",
			pattern: new RegExp("<img[^>]+i_icon_mini"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:html:4",
			kind: "html",
			pattern: new RegExp("<table class=\"[^\"]*forumline"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:jsGlobal:5",
			kind: "jsGlobal",
			property: "phpbb",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phpbb:jsGlobal:6",
			kind: "jsGlobal",
			property: "style_cookie_settings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "phpbb:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^phpbb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "phpbb:meta:8",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("phpBB Group", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "phpbb:dom:9",
			kind: "dom",
			selector: "div[class*='phpbb_copyright'], table[class*='forumline']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "phpbb:html:10",
			kind: "html",
			pattern: new RegExp("powered by <a[^>]+phpbb"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpbb:meta:11",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("phpbb group", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpbb:phpbb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
