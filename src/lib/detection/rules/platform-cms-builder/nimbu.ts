import type { TechnologyDefinition } from '../../types';

export const nimbuTechnologyDefinition = {
	id: "nimbu",
	name: "Nimbu",
	website: "https://www.nimbu.io",
	description: "Nimbu is a platform that integrates content management, e-commerce, and a scalable cloud database into a single system.",
	icon: "Nimbu.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nimbu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.nimbu\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nimbu:jsGlobal:1",
			kind: "jsGlobal",
			property: "nimbuConsentManager",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
