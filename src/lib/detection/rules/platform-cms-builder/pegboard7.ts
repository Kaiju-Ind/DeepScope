import type { TechnologyDefinition } from '../../types';

export const pegboard7TechnologyDefinition = {
	id: "pegboard7",
	name: "Pegboard7",
	website: "https://pegboardsoftware.com.au/",
	description: "Pegboard7 is an online digital platform that covers ecommerce, marketing, and enterprise WCMS software for medium to corporate clients, providing a range of online tools to support their growth.",
	icon: "Pegboard7.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pegboard7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/pegboard\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pegboard7:jsGlobal:1",
			kind: "jsGlobal",
			property: "pegboard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pegboard7:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Pegboard$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pegboard7:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^pegboard$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
