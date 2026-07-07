import type { TechnologyDefinition } from '../../types';

export const gijgoTechnologyDefinition = {
	id: "gijgo",
	name: "Gijgo",
	website: "https://gijgo.com",
	description: "Gijgo is a set of free for commercial use javascript controls.",
	icon: "Gijgo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gijgo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/gijgo@([\\d\\.]+)\\/js\\/gijgo\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
