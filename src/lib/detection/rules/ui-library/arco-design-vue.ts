import type { TechnologyDefinition } from '../../types';

export const arcoDesignVueTechnologyDefinition = {
	id: "arco-design-vue",
	name: "Arco Design Vue",
	website: "https://arco.design",
	description: "Arco Design is a set of open-source UI Components for Vue, aiming to address experience issues in products.",
	icon: "ArcoDesign.svg",
	categories: [
		"ui-library",
		"component-library",
	],
	rules: [
		{
			id: "arco-design-vue:dom:0",
			kind: "dom",
			selector: "link[href*='arcodesign'], link[href*='arco-design'], body[arco-theme], section[class*='arco-layout']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
