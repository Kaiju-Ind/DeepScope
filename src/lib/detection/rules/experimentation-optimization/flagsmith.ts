import type { TechnologyDefinition } from '../../types';

export const flagsmithTechnologyDefinition = {
	id: "flagsmith",
	name: "FlagSmith",
	website: "https://flagsmith.com",
	description: "FlagSmith is an open-source, fully supported feature flag & remote configuration solution, which provides hosted API to help deployment to a private cloud or on-premises environment.",
	icon: "FlagSmith.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "flagsmith:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.flagsmith\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flagsmith:jsGlobal:1",
			kind: "jsGlobal",
			property: "flagsmith",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:flagsmith:flagsmith:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
