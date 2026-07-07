import type { TechnologyDefinition } from '../../types';

export const launchnotesTechnologyDefinition = {
	id: "launchnotes",
	name: "LaunchNotes",
	website: "https://launchnotes.com",
	description: "LaunchNotes is a platform that aligns teams with product development and release pipelines while keeping users informed and engaged with product updates.",
	icon: "LaunchNotes.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "launchnotes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.launchnotes\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
