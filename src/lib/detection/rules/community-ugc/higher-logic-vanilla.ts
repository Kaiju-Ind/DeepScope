import type { TechnologyDefinition } from '../../types';

export const higherLogicVanillaTechnologyDefinition = {
	id: "higher-logic-vanilla",
	name: "Higher Logic Vanilla",
	website: "https://vanilla.higherlogic.com",
	description: "Higher Logic Vanilla is a cloud-based customer community platform offering features like discussion forums, Q&A, ideation, gamification, and advanced analytics, enabling businesses to enhance customer engagement and support.",
	icon: "Higher Logic.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "higher-logic-vanilla:dom:0",
			kind: "dom",
			selector: "body#DiscussionsPage, body#vanilla",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "higher-logic-vanilla:jsGlobal:1",
			kind: "jsGlobal",
			property: "Vanilla",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "higher-logic-vanilla:jsGlobal:2",
			kind: "jsGlobal",
			property: "__VANILLA_GLOBALS__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "higher-logic-vanilla:header:3",
			kind: "header",
			key: " x-vanilla-version",
			valuePattern: new RegExp("([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "higher-logic-vanilla:header:4",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Vanilla", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "higher-logic-vanilla:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("vanilla", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
