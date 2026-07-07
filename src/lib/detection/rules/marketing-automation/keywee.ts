import type { TechnologyDefinition } from '../../types';

export const keyweeTechnologyDefinition = {
	id: "keywee",
	name: "Keywee",
	website: "https://keywee.co",
	description: "Keywee is a platform and managed service designed to support paid media and content distribution operations.",
	icon: "Keywee.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "keywee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.keywee\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
