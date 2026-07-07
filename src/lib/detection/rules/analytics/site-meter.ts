import type { TechnologyDefinition } from '../../types';

export const siteMeterTechnologyDefinition = {
	id: "site-meter",
	name: "Site Meter",
	website: "https://www.sitemeter.com",
	icon: "Site Meter.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "site-meter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sitemeter\\.com\\/js\\/counter\\.js\\?site="),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
