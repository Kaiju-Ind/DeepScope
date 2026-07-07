import type { TechnologyDefinition } from '../../types';

export const oct8neTechnologyDefinition = {
	id: "oct8ne",
	name: "Oct8ne",
	website: "https://oct8ne.com",
	description: "Oct8ne is a visual customer service software.",
	icon: "Oct8ne.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "oct8ne:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.oct8ne\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oct8ne:jsGlobal:1",
			kind: "jsGlobal",
			property: "oct8ne.agentsAvailable",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oct8ne:jsGlobal:2",
			kind: "jsGlobal",
			property: "oct8neApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oct8ne:jsGlobal:3",
			kind: "jsGlobal",
			property: "oct8neVars.pluginVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
