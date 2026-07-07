import type { TechnologyDefinition } from '../../types';

export const probanceTechnologyDefinition = {
	id: "probance",
	name: "Probance",
	website: "https://probance.com",
	description: "Probance is a marketing platform solution that helps businesses manage, track, and analyze marketing activities.",
	icon: "Probance.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "probance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.my-probance\\.one\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
