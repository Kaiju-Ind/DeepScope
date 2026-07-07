import type { TechnologyDefinition } from '../../types';

export const backboneJsTechnologyDefinition = {
	id: "backbone-js",
	name: "Backbone.js",
	website: "https://backbonejs.org",
	description: "BackboneJS is a JavaScript library that allows users to develop and structure the client side applications that run in a web browser.",
	icon: "Backbone.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "backbone-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("backbone.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "backbone-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Backbone",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "backbone-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Backbone.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:backbone_project:backbone:*:*:*:*:*:*:*:*",
	},
	implies: [
		"underscore-js",
	],
} as const satisfies TechnologyDefinition;
