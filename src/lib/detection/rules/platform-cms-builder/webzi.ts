import type { TechnologyDefinition } from '../../types';

export const webziTechnologyDefinition = {
	id: "webzi",
	name: "WebZi",
	website: "https://webzi.ir",
	description: "WebZi is a professional website builder.",
	icon: "Webzi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webzi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/webzi\\.ir\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webzi:jsGlobal:1",
			kind: "jsGlobal",
			property: "WebziCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webzi:jsGlobal:2",
			kind: "jsGlobal",
			property: "WebziValidate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webzi:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Webzi\\.ir\\sWebsite\\sBuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webzi:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webzi\\.ir\\swebsite\\sbuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
