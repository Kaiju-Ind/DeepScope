import type { TechnologyDefinition } from '../../types';

export const vuetifyTechnologyDefinition = {
	id: "vuetify",
	name: "Vuetify",
	website: "https://vuetifyjs.com",
	description: "Vuetify is a reusable semantic component framework for Vue.js that aims to provide clean, semantic and reusable components.",
	icon: "Vuetify.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "vuetify:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.v-application \\.d-block"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "vuetify:dom:1",
			kind: "dom",
			selector: "style#vuetify-theme-stylesheet",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:vuetifyjs:vuetify:*:*:*:*:*:*:*:*",
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
