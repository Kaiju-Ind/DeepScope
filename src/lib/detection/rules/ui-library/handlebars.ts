import type { TechnologyDefinition } from '../../types';

export const handlebarsTechnologyDefinition = {
	id: "handlebars",
	name: "Handlebars",
	website: "https://handlebarsjs.com",
	description: "Handlebars is a JavaScript library used to create reusable webpage templates.",
	icon: "Handlebars.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "handlebars:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("handlebars(?:\\.runtime)?(?:-v([\\d.]+?))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "handlebars:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]*type=[^>]text\\/x-handlebars-template"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "handlebars:jsGlobal:2",
			kind: "jsGlobal",
			property: "Handlebars",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "handlebars:jsGlobal:3",
			kind: "jsGlobal",
			property: "Handlebars.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "handlebars:dom:4",
			kind: "dom",
			selector: "script[type='text/x-handlebars-template']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:handlebars.js_project:handlebars.js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
