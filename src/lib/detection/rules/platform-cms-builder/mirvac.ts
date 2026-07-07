import type { TechnologyDefinition } from '../../types';

export const mirvacTechnologyDefinition = {
	id: "mirvac",
	name: "Mirvac",
	website: "https://www.mirvac.com",
	description: "Mirvac is an Australian property management platform focused on real estate development.",
	icon: "Mirvac.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mirvac:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.mirvac\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mirvac:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.mirvac\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
