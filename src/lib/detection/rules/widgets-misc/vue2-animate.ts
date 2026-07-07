import type { TechnologyDefinition } from '../../types';

export const vue2AnimateTechnologyDefinition = {
	id: "vue2-animate",
	name: "Vue2-animate",
	website: "https://github.com/asika32764/vue2-animate",
	description: "Vue2-animate is a Vue.js port of Animate.css.",
	icon: "vue.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "vue2-animate:dom:0",
			kind: "dom",
			selector: "link[href*='/vue2-animate.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"animate-css",
		"sass",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
