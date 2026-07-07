import type { TechnologyDefinition } from '../../types';

export const opalTechnologyDefinition = {
	id: "opal",
	name: "Opal",
	website: "https://opalrb.org",
	description: "Opal is a Ruby-to-JavaScript compiler that allows Ruby code to run in web browsers by converting it into JavaScript.",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "opal:dom:0",
			kind: "dom",
			selector: "script#opal-elementor-frontend-js, link[href*='opal-boostrap.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
