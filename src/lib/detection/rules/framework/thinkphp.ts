import type { TechnologyDefinition } from '../../types';

export const thinkphpTechnologyDefinition = {
	id: "thinkphp",
	name: "ThinkPHP",
	website: "https://www.thinkphp.cn",
	description: "ThinkPHP is an open-source PHP framework with MVC structure developed and maintained by Shanghai Topthink Company.",
	icon: "ThinkPHP.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "thinkphp:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^thinkphp_show_page_trace$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "thinkphp:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("ThinkPHP", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "thinkphp:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("thinkphp", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:thinkphp:thinkphp:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
