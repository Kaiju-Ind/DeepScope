import type { TechnologyDefinition } from '../../types';

export const akauntingTechnologyDefinition = {
	id: "akaunting",
	name: "Akaunting",
	website: "https://akaunting.com",
	description: "Akaunting is a free and online accounting software.",
	icon: "akaunting.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "akaunting:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+akaunting-green\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "akaunting:html:1",
			kind: "html",
			pattern: new RegExp("Powered By Akaunting: <a [^>]*href=\"https?:\\/\\/(?:www\\.)?akaunting\\.com[^>]+>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "akaunting:header:2",
			kind: "header",
			key: "X-Akaunting",
			valuePattern: new RegExp("^Free Accounting Software$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "akaunting:html:3",
			kind: "html",
			pattern: new RegExp("powered by akaunting: <a [^>]*href=\"https?:\\/\\/(?:www\\.)?akaunting\\.com[^>]+>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "akaunting:header:4",
			kind: "header",
			key: "x-akaunting",
			valuePattern: new RegExp("^free accounting software$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:akaunting:akaunting:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
