import type { TechnologyDefinition } from '../../types';

export const primengTechnologyDefinition = {
	id: "primeng",
	name: "PrimeNG",
	website: "https://www.primefaces.org",
	description: "PrimeNG is a rich set of open-source UI Components for Angular.",
	icon: "PrimeNG.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "primeng:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "primeng:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text|sidebar)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
	},
	requires: [
		"angular",
	],
} as const satisfies TechnologyDefinition;
