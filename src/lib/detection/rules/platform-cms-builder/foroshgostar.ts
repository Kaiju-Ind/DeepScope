import type { TechnologyDefinition } from '../../types';

export const foroshgostarTechnologyDefinition = {
	id: "foroshgostar",
	name: "ForoshGostar",
	website: "https://www.foroshgostar.com",
	icon: "ForoshGostar.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "foroshgostar:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^Aws\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foroshgostar:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Forosh\\s?Gostar.*|Arsina Webshop.*$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "foroshgostar:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^aws\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "foroshgostar:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^forosh\\s?gostar.*|arsina webshop.*$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
