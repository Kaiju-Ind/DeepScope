import type { TechnologyDefinition } from '../../types';

export const ringostatTechnologyDefinition = {
	id: "ringostat",
	name: "Ringostat",
	website: "https://ringostat.com",
	description: "Ringostat is an AI-powered platform designed for business phone systems and marketing performance.",
	icon: "Ringostat.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ringostat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.ringostat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ringostat:jsGlobal:1",
			kind: "jsGlobal",
			property: "ringostatAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ringostat:jsGlobal:2",
			kind: "jsGlobal",
			property: "ringostatAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ringostat:jsGlobal:3",
			kind: "jsGlobal",
			property: "ringostatRestartSubstitution",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
