import type { TechnologyDefinition } from '../../types';

export const miradorTechnologyDefinition = {
	id: "mirador",
	name: "Mirador",
	website: "https://www.miradortech.com",
	description: "Mirador is a platform designed to enhance customer acquisition, streamline digital loan applications, and enable intelligent product routing and digitization.",
	icon: "Mirador.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "mirador:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.miradorfin\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
