import type { TechnologyDefinition } from '../../types';

export const cannyTechnologyDefinition = {
	id: "canny",
	name: "Canny",
	website: "https://canny.io",
	description: "Canny is a cloud-based solution that helps small to large businesses collect, analyse, prioritise and track user feedback to make informed product decisions.",
	icon: "Canny.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "canny:dom:0",
			kind: "dom",
			selector: "a[href*='.canny.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "canny:jsGlobal:1",
			kind: "jsGlobal",
			property: "Canny",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canny:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\/\\/canny\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "canny:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\/\\/canny\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
