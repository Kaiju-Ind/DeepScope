import type { TechnologyDefinition } from '../../types';

export const primevueTechnologyDefinition = {
	id: "primevue",
	name: "PrimeVue",
	website: "https://www.primefaces.org",
	description: "PrimeVue is a rich set of open-source UI Components for Vue.js.",
	icon: "PrimeVue.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "primevue:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "primevue:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text|sidebar)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "primevue:dom:2",
			kind: "dom",
			selector: "style[data-primevue-style-id]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
	},
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
