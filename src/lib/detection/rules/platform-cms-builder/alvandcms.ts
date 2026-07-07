import type { TechnologyDefinition } from '../../types';

export const alvandcmsTechnologyDefinition = {
	id: "alvandcms",
	name: "AlvandCMS",
	website: "https://alvandcms.com",
	description: "Alvand is a PHP-based CMS with a modular architecture to enhance scalability and maintainability. It utilizes caching, reduces database queries and employs optimization mechanisms to improve request processing performance. The system supports RESTful APIs, user access management and built-in SEO. It features an independent templating system and dynamic cache management to minimize page load times. It's compatible with MySQL and MariaDB and includes security measures to prevent common attacks.",
	icon: "AlvandCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "alvandcms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("AlvandCMS\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "alvandcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("alvandcms\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
