import type { TechnologyDefinition } from '../../types';

export const omekaTechnologyDefinition = {
	id: "omeka",
	name: "Omeka",
	website: "https://omeka.org",
	description: "Omeka is a free Content Management System (CMS) used by archives, historical societies, libraries, museums, and individual researchers for publishing digital collections.",
	icon: "Omeka.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "omeka:jsGlobal:0",
			kind: "jsGlobal",
			property: "Omeka",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omeka:dom:1",
			kind: "dom",
			selector: "link[rel*='stylesheet'][href*='css/myomeka.css'], link[rel*='stylesheet'][href*='/omeka/plugins/'], footer > p > a[href*='//omeka.org']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:omeka:omeka:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
