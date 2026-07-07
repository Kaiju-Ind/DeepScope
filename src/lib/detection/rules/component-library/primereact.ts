import type { TechnologyDefinition } from '../../types';

export const primereactTechnologyDefinition = {
	id: "primereact",
	name: "PrimeReact",
	website: "https://www.primefaces.org",
	description: "PrimeReact is a rich set of open-source UI Components for React.",
	icon: "PrimeReact.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "primereact:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "primereact:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.p-(?:toast|calendar|dialog-mask|menuitem-text|sidebar)(?:-content)?\\{"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "primereact:dom:2",
			kind: "dom",
			selector: ".p-button[data-pc-name='button'][data-pc-section='root'], .p-datatable[data-pc-name='datatable'][data-pc-section='root'], .p-inputnumber[data-pc-name='inputnumber'][data-pc-section='root']",
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
		"react",
	],
} as const satisfies TechnologyDefinition;
