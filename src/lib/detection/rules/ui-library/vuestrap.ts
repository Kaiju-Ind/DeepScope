import type { TechnologyDefinition } from '../../types';

export const vuestrapTechnologyDefinition = {
	id: "vuestrap",
	name: "VueStrap",
	website: "https://yuche.github.io/vue-strap",
	description: "VueStrap is a collection of Bootstrap components built with Vue.js.",
	icon: "vue.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "vuestrap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/vue-strap\\/([\\d\\.]+)\\/vue-strap\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vuestrap:jsGlobal:1",
			kind: "jsGlobal",
			property: "VueStrap.$",
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
