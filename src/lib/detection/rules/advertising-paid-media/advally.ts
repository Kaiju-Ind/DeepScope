import type { TechnologyDefinition } from '../../types';

export const advallyTechnologyDefinition = {
	id: "advally",
	name: "Advally",
	website: "https://www.advally.com",
	description: "Advally is an advertising platform for publishers.",
	icon: "Advally.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "advally:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.adligature\\.com\\/.+\\/advally-([\\d.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "advally:jsGlobal:1",
			kind: "jsGlobal",
			property: "advally",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
