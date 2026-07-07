import type { TechnologyDefinition } from '../../types';

export const chamiloTechnologyDefinition = {
	id: "chamilo",
	name: "Chamilo",
	website: "https://www.chamilo.org",
	description: "Chamilo is an open-source learning management and collaboration system.",
	icon: "Chamilo.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "chamilo:dom:0",
			kind: "dom",
			selector: "link[href*='chamilo.org/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "chamilo:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Chamilo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "chamilo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Chamilo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "chamilo:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("chamilo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "chamilo:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("chamilo ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:chamilo:chamilo_lms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
