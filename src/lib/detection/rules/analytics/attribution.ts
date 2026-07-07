import type { TechnologyDefinition } from '../../types';

export const attributionTechnologyDefinition = {
	id: "attribution",
	name: "Attribution",
	website: "https://www.attributionapp.com",
	description: "Attribution is a marketing analytics platform that provides marketers with insights to understand the cost, revenue and profit resulting from marketing programs.",
	icon: "Attribution.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "attribution:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.attributionapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "attribution:jsGlobal:1",
			kind: "jsGlobal",
			property: "Attribution.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			confidence: 50,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "attribution:jsGlobal:2",
			kind: "jsGlobal",
			property: "Attribution._options",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
