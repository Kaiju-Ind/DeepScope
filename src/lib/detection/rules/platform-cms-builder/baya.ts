import type { TechnologyDefinition } from '../../types';

export const bayaTechnologyDefinition = {
	id: "baya",
	name: "Baya",
	website: "https://baya.co",
	description: "Baya is a platform that enables the creation of professional websites for small businesses, offering tools to design, build, and manage an online presence.",
	icon: "Baya.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "baya:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.baya\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
