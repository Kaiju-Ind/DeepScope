import type { TechnologyDefinition } from '../../types';

export const exitintelTechnologyDefinition = {
	id: "exitintel",
	name: "ExitIntel",
	website: "https://exitintelligence.com",
	description: "ExitIntel is a full service conversion optimisation agency that focuses on ecommerce companies.",
	icon: "ExitIntel.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "exitintel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:get.)?exitintel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "exitintel:jsGlobal:1",
			kind: "jsGlobal",
			property: "exitintel.VERSION",
			valuePattern: new RegExp("(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "exitintel:jsGlobal:2",
			kind: "jsGlobal",
			property: "exitintelAccount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "exitintel:jsGlobal:3",
			kind: "jsGlobal",
			property: "exitintelConfig",
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
