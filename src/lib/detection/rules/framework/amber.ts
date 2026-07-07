import type { TechnologyDefinition } from '../../types';

export const amberTechnologyDefinition = {
	id: "amber",
	name: "Amber",
	website: "https://amberframework.org",
	description: "Amber is a web application framework written in Crystal inspired by Kemal, Rails, Phoenix and other popular application frameworks.",
	icon: "amber.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "amber:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Amber$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amber:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^amber$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
