import type { TechnologyDefinition } from '../../types';

export const elementTechnologyDefinition = {
	id: "element",
	name: "Element",
	website: "https://element.io",
	description: "Element is a Matrix-based end-to-end encrypted messenger and secure collaboration app.",
	icon: "elementio.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "element:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Element$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "element:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^element$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
		],
		cpe: "cpe:2.3:a:matrix:element:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
