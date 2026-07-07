import type { TechnologyDefinition } from '../../types';

export const bonsaiTechnologyDefinition = {
	id: "bonsai",
	name: "Bonsai",
	website: "https://www.hellobonsai.com",
	description: "Bonsai is a platform that creates, sends, and tracks proposals online for streamlined client communication and project management.",
	icon: "Bonsai.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bonsai:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.hellobonsai.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bonsai:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^Bonsai$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bonsai:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^bonsai$", "i"),
			description: "Meta tag matches a known technology marker.",
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
