import type { TechnologyDefinition } from '../../types';

export const lianaTechnologyDefinition = {
	id: "liana",
	name: "Liana",
	website: "https://www.lianatech.com/solutions/websites-and-commerce/websites.html",
	icon: "Liana.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "liana:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.lianacms\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "liana:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Sivuviidakko", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "liana:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.lianacms\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "liana:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sivuviidakko", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
