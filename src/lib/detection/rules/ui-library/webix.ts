import type { TechnologyDefinition } from '../../types';

export const webixTechnologyDefinition = {
	id: "webix",
	name: "Webix",
	website: "https://webix.com",
	description: "Webix is a JavaScript UI library that offers over 100 customizable UI components for creating web applications, supporting integration with frameworks like Angular, React, and Vue.js.",
	icon: "Webix.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "webix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\bwebix\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webix:jsGlobal:1",
			kind: "jsGlobal",
			property: "webix",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
