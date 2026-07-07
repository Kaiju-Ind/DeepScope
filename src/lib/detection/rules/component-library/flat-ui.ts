import type { TechnologyDefinition } from '../../types';

export const flatUiTechnologyDefinition = {
	id: "flat-ui",
	name: "Flat UI",
	website: "https://designmodo.github.io/Flat-UI/",
	icon: "Flat UI.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "flat-ui:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+flat-ui(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "flat-ui:dom:1",
			kind: "dom",
			selector: "link[href*='flat-ui.css'], link[href*='flat-ui.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"bootstrap",
	],
} as const satisfies TechnologyDefinition;
