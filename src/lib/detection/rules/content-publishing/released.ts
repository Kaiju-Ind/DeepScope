import type { TechnologyDefinition } from '../../types';

export const releasedTechnologyDefinition = {
	id: "released",
	name: "Released",
	website: "https://www.released.so",
	description: "Released is a tool that generates release notes from Jira tickets, reducing the time required to craft and publish release notes.",
	icon: "Released.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "released:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.released\\.so\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
