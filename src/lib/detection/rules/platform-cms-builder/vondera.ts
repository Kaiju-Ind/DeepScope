import type { TechnologyDefinition } from '../../types';

export const vonderaTechnologyDefinition = {
	id: "vondera",
	name: "Vondera",
	website: "https://www.vondera.app",
	description: "Vondera is an eCommerce platform in Egypt that enables online store management with local shipping, secure payments, and integration with social media platforms and marketplaces.",
	icon: "Vondera.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vondera:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("qaf\\.vondera\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "vondera:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.vondera\\.shop"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "vondera:meta:2",
			kind: "meta",
			key: "ecommerce",
			valuePattern: new RegExp("^Vondera$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vondera:meta:3",
			kind: "meta",
			key: "vondera-ecommerce",
			valuePattern: new RegExp("^Vondera$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vondera:meta:4",
			kind: "meta",
			key: "ecommerce",
			valuePattern: new RegExp("^vondera$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vondera:meta:5",
			kind: "meta",
			key: "vondera-ecommerce",
			valuePattern: new RegExp("^vondera$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vondera:scriptContent:6",
			kind: "scriptContent",
			pattern: new RegExp("(qaf\\.vondera\\.io|\\.vondera\\.shop)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
