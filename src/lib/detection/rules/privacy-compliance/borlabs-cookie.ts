import type { TechnologyDefinition } from '../../types';

export const borlabsCookieTechnologyDefinition = {
	id: "borlabs-cookie",
	name: "Borlabs Cookie",
	website: "https://borlabs.io/borlabs-cookie/",
	description: "Borlabs Cookie is a GDPR cookie consent plugin for WordPress.",
	icon: "Borlabs Cookie.svg",
	categories: [
		"privacy-compliance",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "borlabs-cookie:dom:0",
			kind: "dom",
			selector: "#BorlabsCookieBox",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "borlabs-cookie:jsGlobal:1",
			kind: "jsGlobal",
			property: "borlabsCookieConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
