import type { TechnologyDefinition } from '../../types';

export const poshmarkTechnologyDefinition = {
	id: "poshmark",
	name: "Poshmark",
	website: "https://poshmark.com",
	description: "Poshmark is a platform for buying and selling new or used fashion items, including clothing, shoes, and accessories.",
	icon: "Poshmark.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "poshmark:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/poshmark\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "poshmark:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/\\/poshmark\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
