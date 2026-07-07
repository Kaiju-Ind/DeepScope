import type { TechnologyDefinition } from '../../types';

export const godaddyWebsiteBuilderTechnologyDefinition = {
	id: "godaddy-website-builder",
	name: "GoDaddy Website Builder",
	website: "https://www.godaddy.com/websites/website-builder",
	icon: "GoDaddy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "godaddy-website-builder:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^dps_site_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "godaddy-website-builder:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Go Daddy Website Builder (.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "godaddy-website-builder:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("go daddy website builder (.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
		],
	},
} as const satisfies TechnologyDefinition;
