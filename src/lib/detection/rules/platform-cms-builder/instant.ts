import type { TechnologyDefinition } from '../../types';

export const instantTechnologyDefinition = {
	id: "instant",
	name: "Instant",
	website: "https://instant.so",
	description: "Instant is a no-code, visual page builder for Shopify, allowing users to create custom landing pages and sections through a drag-and-drop interface without requiring any coding skills.",
	icon: "Instant.svg",
	categories: [
		"platform-cms-builder",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "instant:dom:0",
			kind: "dom",
			selector: "div[class='__instant'][data-instant-version]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "instant:jsGlobal:1",
			kind: "jsGlobal",
			property: "Instant.initialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "instant:jsGlobal:2",
			kind: "jsGlobal",
			property: "Instant.initializedVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "instant:jsGlobal:3",
			kind: "jsGlobal",
			property: "__instantInitSliders",
			description: "Page-owned global matches a known technology marker.",
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
