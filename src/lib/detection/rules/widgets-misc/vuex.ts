import type { TechnologyDefinition } from '../../types';

export const vuexTechnologyDefinition = {
	id: "vuex",
	name: "Vuex",
	website: "https://vuex.vuejs.org/",
	description: "Vuex is a state management pattern + library for Vue.js applications.",
	icon: "vue.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "vuex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/vuex@([\\d.]+)\\/dist\\/vuex\\.global(?:\\.prod)?\\.js|\\/vuex(?:\\.global(?:\\.prod)?)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vuex:jsGlobal:0",
			kind: "jsGlobal",
			property: "Vuex.version",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vuex:jsGlobal:1",
			kind: "jsGlobal",
			property: "Vuex.createStore",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
