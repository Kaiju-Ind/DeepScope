import type { TechnologyDefinition } from '../../types';

export const naiveUiTechnologyDefinition = {
	id: "naive-ui",
	name: "Naive UI",
	website: "https://www.naiveui.com",
	description: "Naive UI is a Vue.js UI library written in TypeScript, offering more than 80 treeshakable components.",
	icon: "Naive UI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "naive-ui:dom:0",
			kind: "dom",
			selector: "style[cssr-id^='n-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"typescript",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
