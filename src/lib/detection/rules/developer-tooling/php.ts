import type { TechnologyDefinition } from '../../types';

export const phpTechnologyDefinition = {
	id: "php",
	name: "PHP",
	website: "https://php.net",
	description: "PHP is a server-side scripting language commonly used to build dynamic websites and web applications.",
	icon: "PHP.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "php:url:0",
			kind: "url",
			pattern: new RegExp("\\.php(?:$|\\?)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "php:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^PHPSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "php:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("php\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "php:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^php\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "php:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("\\.php(?:\\?|$)"),
			confidence: 35,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "php:dom:5",
			kind: "dom",
			selector: "form[action*='login_process.php'], form[action*='assets/mail.php']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "php:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^phpsessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "php:header:7",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("php\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "php:header:8",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^php\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "php:dom:9",
			kind: "dom",
			selector: "form[action*='login_process.php']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "php:scriptContent:10",
			kind: "scriptContent",
			pattern: new RegExp("\\/admin\\/index\\.php"),
			confidence: 35,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "php:header:11",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^PHP\\/?([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:php:php:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
