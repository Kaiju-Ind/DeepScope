import type { TechnologyDefinition } from '../../types';

export const cleverTechnologyDefinition = {
	id: "clever",
	name: "Clever",
	website: "https://www.clever.com",
	description: "Clever is an identity platform for education that helps schools and applications secure identities, manage data access, and support classroom learning.",
	icon: "Clever.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clever:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("clever\\.com"),
			description: "Script content contains a bounded technology signature.",
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
