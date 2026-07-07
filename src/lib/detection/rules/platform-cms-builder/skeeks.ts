import type { TechnologyDefinition } from '../../types';

export const skeeksTechnologyDefinition = {
	id: "skeeks",
	name: "Skeeks",
	website: "https://skeeks.com",
	description: "Skeeks is a content management system (CMS) designed to create, organize, and manage digital content.",
	icon: "Skeeks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "skeeks:jsGlobal:0",
			kind: "jsGlobal",
			property: "Skeeks.$",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skeeks:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SkeekS CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "skeeks:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^skeeks cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
