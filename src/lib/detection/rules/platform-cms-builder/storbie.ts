import type { TechnologyDefinition } from '../../types';

export const storbieTechnologyDefinition = {
	id: "storbie",
	name: "Storbie",
	website: "https://www.storbie.com",
	description: "Storbie is an online store and marketplace builder platform that allows businesses to create and manage their own ecommerce website.",
	icon: "Storbie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storbie:jsGlobal:0",
			kind: "jsGlobal",
			property: "StorbieLibrary",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storbie:jsGlobal:1",
			kind: "jsGlobal",
			property: "StorbieValidation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storbie:jsGlobal:2",
			kind: "jsGlobal",
			property: "storbie.addParentPageContext",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
