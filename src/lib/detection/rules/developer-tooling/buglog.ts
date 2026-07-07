import type { TechnologyDefinition } from '../../types';

export const buglogTechnologyDefinition = {
	id: "buglog",
	name: "Buglog",
	website: "https://buglog.com",
	description: "Buglog is a tool for creating and sharing bug reports in real-time directly from the browser.",
	icon: "Buglog.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "buglog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.buglog\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buglog:jsGlobal:1",
			kind: "jsGlobal",
			property: "buglog",
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
