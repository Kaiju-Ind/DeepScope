import type { TechnologyDefinition } from '../../types';

export const mapplicTechnologyDefinition = {
	id: "mapplic",
	name: "Mapplic",
	website: "https://mapplic.com",
	description: "Mapplic is a plugin for creating interactive maps based on simple image (jpg, png) or vector (svg) files.",
	icon: "Mapplic.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mapplic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/mapplic\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mapplic:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/include\\/mapplic\\/mapplic\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mapplic:dom:2",
			kind: "dom",
			selector: "div.mapplic-layer > div.mapplic-map-image",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
