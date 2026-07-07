import type { TechnologyDefinition } from '../../types';

export const curatedTechnologyDefinition = {
	id: "curated",
	name: "Curated",
	website: "https://www.curated.co",
	description: "Curated is a platform that helps organize engaging content and support ongoing customer relationship development through consistent and relevant interactions.",
	icon: "Curated.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "curated:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("push\\.curated\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "curated:jsGlobal:1",
			kind: "jsGlobal",
			property: "CURATED.fCTA",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
