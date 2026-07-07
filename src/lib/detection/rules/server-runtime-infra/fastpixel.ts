import type { TechnologyDefinition } from '../../types';

export const fastpixelTechnologyDefinition = {
	id: "fastpixel",
	name: "FastPixel",
	website: "https://fastpixel.io",
	description: "FastPixel is a web performance and security service that provides caching, a content delivery network, web application firewall, and image optimization.",
	icon: "FastPixel.svg",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "fastpixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.fastpixel\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fastpixel:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+href=\"https:\\/\\/cdn\\.fastpixel\\.io"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
