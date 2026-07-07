import type { TechnologyDefinition } from '../../types';

export const pagecloudTechnologyDefinition = {
	id: "pagecloud",
	name: "Pagecloud",
	website: "https://www.pagecloud.com",
	description: "Pagecloud is a drag-and-drop website builder that enables you to design and deploy websites without writing code.",
	icon: "Pagecloud.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagecloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app-assets\\.pagecloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagecloud:dom:1",
			kind: "dom",
			selector: "head[pagecloud-version]",
			description: "DOM selector matches a known technology marker.",
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
