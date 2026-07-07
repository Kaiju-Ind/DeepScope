import type { TechnologyDefinition } from '../../types';

export const stampedeTechnologyDefinition = {
	id: "stampede",
	name: "Stampede",
	website: "https://stampede.ai",
	description: "Stampede is a platform that consolidates guest engagement technologies into one seamless system for managing interactions and operational touchpoints.",
	icon: "Stampede.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "stampede:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stampede\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stampede:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("stampede\\.ai", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "stampede:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Stampede$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "stampede:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("stampede\\.ai", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "stampede:meta:4",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^stampede$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
