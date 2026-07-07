import type { TechnologyDefinition } from '../../types';

export const techtargetTechnologyDefinition = {
	id: "techtarget",
	name: "TechTarget",
	website: "https://www.techtarget.com",
	description: "TechTarget is a resource providing technology professionals and buyers with the technical information required to perform in their roles.",
	icon: "TechTarget.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "techtarget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.techtarget\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "techtarget:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadTechTarget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "techtarget:jsGlobal:2",
			kind: "jsGlobal",
			property: "techtargetic.client",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
