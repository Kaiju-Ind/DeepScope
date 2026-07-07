import type { TechnologyDefinition } from '../../types';

export const ruzukuTechnologyDefinition = {
	id: "ruzuku",
	name: "Ruzuku",
	website: "https://www.ruzuku.com",
	description: "Ruzuku is a platform for creating and managing online courses and communities, enabling instructors to organize content, engage learners, and deliver educational programs through a web-based interface.",
	icon: "Ruzuku.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "ruzuku:jsGlobal:0",
			kind: "jsGlobal",
			property: "ruzukuGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
