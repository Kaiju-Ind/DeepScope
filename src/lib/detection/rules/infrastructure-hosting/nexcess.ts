import type { TechnologyDefinition } from '../../types';

export const nexcessTechnologyDefinition = {
	id: "nexcess",
	name: "Nexcess",
	website: "https://www.nexcess.net",
	description: "Nexcess is a web hosting service.",
	icon: "nexcess.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "nexcess:header:0",
			kind: "header",
			key: "x-hostname",
			valuePattern: new RegExp("nxcli\\.net$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
