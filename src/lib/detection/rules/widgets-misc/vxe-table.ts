import type { TechnologyDefinition } from '../../types';

export const vxeTableTechnologyDefinition = {
	id: "vxe-table",
	name: "vxe-table",
	website: "https://vxetable.cn",
	description: "vxe-table is a Vue.js based PC form component, support add, delete, change, virtual scroll, lazy load, shortcut menu, data validation, tree structure, print export, form rendering, data paging, virtual list, modal window, custom template, renderer, flexible configuration items, extension interface.",
	icon: "vxe-table.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "vxe-table:dom:0",
			kind: "dom",
			selector: "div[class*='vxe-table']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
