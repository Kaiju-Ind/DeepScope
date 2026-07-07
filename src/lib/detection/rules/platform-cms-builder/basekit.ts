import type { TechnologyDefinition } from '../../types';

export const basekitTechnologyDefinition = {
	id: "basekit",
	name: "BaseKit",
	website: "https://www.basekit.com/",
	description: "BaseKit is a platform offering website-building solutions for small businesses and individuals. It enables users to create websites easily with drag-and-drop tools and customizable templates, without the need to write code.",
	icon: "BaseKit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "basekit:jsGlobal:0",
			kind: "jsGlobal",
			property: "BaseKit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "basekit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^BaseKit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "basekit:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^basekit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
