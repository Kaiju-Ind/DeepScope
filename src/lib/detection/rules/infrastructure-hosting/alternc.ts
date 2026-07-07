import type { TechnologyDefinition } from '../../types';

export const alterncTechnologyDefinition = {
	id: "alternc",
	name: "AlternC",
	website: "https://alternc.com",
	description: "AlternC is a set of software management on Linux shared hosting.",
	icon: "AlternC.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "alternc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/alternc\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
		cpe: "cpe:2.3:a:alternc:alternc:*:*:*:*:*:*:*:*",
	},
	requires: [
		"debian",
	],
} as const satisfies TechnologyDefinition;
