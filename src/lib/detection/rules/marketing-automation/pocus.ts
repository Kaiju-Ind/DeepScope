import type { TechnologyDefinition } from '../../types';

export const pocusTechnologyDefinition = {
	id: "pocus",
	name: "Pocus",
	website: "https://www.pocus.com",
	description: "Pocus is a platform that uses AI agents to monitor B2B accounts and identify real sales opportunities at critical moments.",
	icon: "Pocus.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pocus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/pocustrack\\.com\\/pocus\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
