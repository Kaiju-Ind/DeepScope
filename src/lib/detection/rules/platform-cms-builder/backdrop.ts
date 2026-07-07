import type { TechnologyDefinition } from '../../types';

export const backdropTechnologyDefinition = {
	id: "backdrop",
	name: "Backdrop",
	website: "https://backdropcms.org",
	description: "Backdrop is an open-source content management system (CMS) derived from Drupal 7, offering a user-friendly interface, customisable content types, taxonomies, views, theming capabilities, extensibility through modules, and regular security updates.",
	icon: "Backdrop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "backdrop:jsGlobal:0",
			kind: "jsGlobal",
			property: "Backdrop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "backdrop:header:1",
			kind: "header",
			key: "X-Generator",
			valuePattern: new RegExp("^Backdrop CMS(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "backdrop:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Backdrop CMS(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "backdrop:header:3",
			kind: "header",
			key: "x-generator",
			valuePattern: new RegExp("^backdrop cms(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "backdrop:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^backdrop cms(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:backdropcms:backdrop:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
	excludes: [
		"drupal",
		"drupal-multisite",
	],
} as const satisfies TechnologyDefinition;
