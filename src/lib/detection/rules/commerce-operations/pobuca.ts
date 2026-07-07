import type { TechnologyDefinition } from '../../types';

export const pobucaTechnologyDefinition = {
	id: "pobuca",
	name: "Pobuca",
	website: "https://pobuca.com",
	description: "Pobuca is a cloud-based software platform for managing customer loyalty programs and engagement initiatives.",
	icon: "Pobuca.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pobuca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.loyalty\\.pobuca\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pobuca:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.loyalty\\.pobuca\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
