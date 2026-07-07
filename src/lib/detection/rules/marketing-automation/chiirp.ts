import type { TechnologyDefinition } from '../../types';

export const chiirpTechnologyDefinition = {
	id: "chiirp",
	name: "CHIIRP",
	website: "https://chiirp.com",
	description: "CHIIRP is an AI-powered lead conversion tool for trade businesses that captures and manages calls and inquiries to support timely follow-up and improved lead conversion.",
	icon: "CHIIRP.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "chiirp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.chiirp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
