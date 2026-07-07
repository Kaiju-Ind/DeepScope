import type { TechnologyDefinition } from '../../types';

export const dynamicwebTechnologyDefinition = {
	id: "dynamicweb",
	name: "Dynamicweb",
	website: "https://www.dynamicweb.dk",
	description: "Dynamicweb is a all-in-one platform for content management, ecommerce, digital marketing​, product information management (PIM) and integration.",
	icon: "Dynamicweb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dynamicweb:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^Dynamicweb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dynamicweb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Dynamicweb ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dynamicweb:dom:2",
			kind: "dom",
			selector: "input[value='dynamicweb.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dynamicweb:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^dynamicweb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dynamicweb:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("dynamicweb ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
