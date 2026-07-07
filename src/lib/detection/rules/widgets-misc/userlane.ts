import type { TechnologyDefinition } from '../../types';

export const userlaneTechnologyDefinition = {
	id: "userlane",
	name: "Userlane",
	website: "https://www.userlane.com",
	description: "Userlane is a platform that provides an interactive step-by-step guide system designed to help users navigate software applications.",
	icon: "Userlane.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "userlane:jsGlobal:0",
			kind: "jsGlobal",
			property: "Userlane",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userlane:jsGlobal:1",
			kind: "jsGlobal",
			property: "UserlaneCommandObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
