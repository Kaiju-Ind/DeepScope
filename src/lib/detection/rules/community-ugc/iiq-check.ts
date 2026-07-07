import type { TechnologyDefinition } from '../../types';

export const iiqCheckTechnologyDefinition = {
	id: "iiq-check",
	name: "iiQ Check",
	website: "https://www.iiq-check.de",
	description: "iiQ Check is a system designed to optimize hotel guest communication and manage review distribution.",
	icon: "iiQCheck.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "iiq-check:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.iiq-check\\.de"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
