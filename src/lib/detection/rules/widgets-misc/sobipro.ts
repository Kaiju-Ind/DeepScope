import type { TechnologyDefinition } from '../../types';

export const sobiproTechnologyDefinition = {
	id: "sobipro",
	name: "SobiPro",
	website: "https://sigsiu.net/sobipro.html",
	description: "SobiPro is a directory and listing management extension for Joomla, used to create and manage directories, business listings, and other types of structured content on websites.",
	icon: "SobiPro.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sobipro:jsGlobal:0",
			kind: "jsGlobal",
			property: "SobiProUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
