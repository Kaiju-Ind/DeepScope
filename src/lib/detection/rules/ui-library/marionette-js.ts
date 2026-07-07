import type { TechnologyDefinition } from '../../types';

export const marionetteJsTechnologyDefinition = {
	id: "marionette-js",
	name: "Marionette.js",
	website: "https://marionettejs.com",
	description: "Marionette is a composite application library for Backbone.js that aims to simplify the construction of large scale JavaScript applications. It is a collection of common design and implementation patterns found in applications.",
	icon: "Marionette.js.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "marionette-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("backbone\\.marionette.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marionette-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Marionette",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "marionette-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Marionette.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"backbone-js",
		"underscore-js",
	],
} as const satisfies TechnologyDefinition;
