import type { TechnologyDefinition } from '../../types';

export const kemalTechnologyDefinition = {
	id: "kemal",
	name: "Kemal",
	website: "https://kemalcr.com",
	description: "Kemal is a fast and efficient web framework for the Crystal programming language.",
	icon: "kemalcr.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "kemal:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Kemal", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kemal:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("kemal", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
