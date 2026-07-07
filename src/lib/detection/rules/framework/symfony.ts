import type { TechnologyDefinition } from '../../types';

export const symfonyTechnologyDefinition = {
	id: "symfony",
	name: "Symfony",
	website: "https://symfony.com",
	description: "Symfony is a PHP web application framework and a set of reusable PHP components/libraries.",
	icon: "Symfony.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "symfony:dom:0",
			kind: "dom",
			selector: "div.sf-toolbar-block, div.sf-toolbar",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "symfony:jsGlobal:1",
			kind: "jsGlobal",
			property: "Sfjs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "symfony:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^sf_redirect$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "symfony:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\/@?symfony\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:sensiolabs:symfony:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
