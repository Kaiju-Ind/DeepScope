import type { TechnologyDefinition } from '../../types';

export const atomseoTechnologyDefinition = {
	id: "atomseo",
	name: "Atomseo",
	website: "https://atomseo.com",
	description: "Atomseo is a tool designed to improve website performance by reducing user bounce rates and enhancing search engine visibility.",
	icon: "Atomseo.svg",
	categories: [
		"marketing-automation",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "atomseo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.atomseo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "atomseo:dom:1",
			kind: "dom",
			selector: "link[href*='.atomseo.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
