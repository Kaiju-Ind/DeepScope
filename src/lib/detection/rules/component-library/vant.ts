import type { TechnologyDefinition } from '../../types';

export const vantTechnologyDefinition = {
	id: "vant",
	name: "Vant",
	website: "https://github.com/youzan/vant",
	description: "Vant is a lightweight, customisable Vue UI library for mobile web apps.",
	icon: "Vant.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "vant:dom:0",
			kind: "dom",
			selector: "link[href*='/npm/vant']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vant:dom:1",
			kind: "dom",
			selector: "link[href*='/vant-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vant:jsGlobal:2",
			kind: "jsGlobal",
			property: "vant.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vant:dom:3",
			kind: "dom",
			selector: "link[href*='/npm/vant'], link[href*='/vant-'], html[class*='van-doc-theme-dark']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"typescript",
	],
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
