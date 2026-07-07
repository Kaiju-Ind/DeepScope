import type { TechnologyDefinition } from '../../types';

export const siteKitTechnologyDefinition = {
	id: "site-kit",
	name: "Site Kit",
	website: "https://sitekit.withgoogle.com/",
	description: "Site Kit is an one-stop solution for WordPress users to use everything Google has to offer to make them successful on the web.",
	icon: "Google.svg",
	categories: [
		"analytics",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "site-kit:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Site Kit by Google ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "site-kit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^site kit by google ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:google:site_kit:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
