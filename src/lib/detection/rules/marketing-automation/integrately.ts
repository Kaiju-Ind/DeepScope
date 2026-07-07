import type { TechnologyDefinition } from '../../types';

export const integratelyTechnologyDefinition = {
	id: "integrately",
	name: "Integrately",
	website: "https://integrately.com",
	description: "Integrately is a click automation software that enables connection of multiple applications.",
	icon: "Integrately.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "integrately:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.integrately\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "integrately:dom:1",
			kind: "dom",
			selector: "input[value*='app.integrately.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
