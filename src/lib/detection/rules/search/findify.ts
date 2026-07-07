import type { TechnologyDefinition } from '../../types';

export const findifyTechnologyDefinition = {
	id: "findify",
	name: "Findify",
	website: "https://www.findify.io",
	description: "Findify is an intelligent ecommerce search, navigation and personalisation solution.",
	icon: "Findify.svg",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "findify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@findify\\/bundle@([\\d.]+)\\/dist\\/.+\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "findify:jsGlobal:1",
			kind: "jsGlobal",
			property: "FindifyAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "findify:jsGlobal:2",
			kind: "jsGlobal",
			property: "findify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
