import type { TechnologyDefinition } from '../../types';

export const mopinionTechnologyDefinition = {
	id: "mopinion",
	name: "Mopinion",
	website: "https://mopinion.com",
	description: "Mopinion is an all-in-one user feedback platform that helps digital enterprises listen, understand, and act across all digital touchpoints.",
	icon: "Mopinion.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "mopinion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("deploy\\.mopinion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mopinion:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pastease",
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
