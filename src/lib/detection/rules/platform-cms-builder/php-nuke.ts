import type { TechnologyDefinition } from '../../types';

export const phpNukeTechnologyDefinition = {
	id: "php-nuke",
	name: "PHP-Nuke",
	website: "https://phpnuke.org",
	description: "PHP-Nuke is a free, web-based content management system for creating community portals and managing news, originally developed by Francisco Burzi using PHP and MySQL​.",
	icon: "PHP-Nuke.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "php-nuke:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+Powered by PHP-Nuke"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "php-nuke:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("PHP-Nuke", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "php-nuke:html:2",
			kind: "html",
			pattern: new RegExp("<[^>]+powered by php-nuke"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "php-nuke:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("php-nuke", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:phpnuke:php-nuke:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
