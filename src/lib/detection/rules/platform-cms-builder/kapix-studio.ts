import type { TechnologyDefinition } from '../../types';

export const kapixStudioTechnologyDefinition = {
	id: "kapix-studio",
	name: "Kapix Studio",
	website: "https://studio.kapix.fr",
	description: "Kapix Studio is a no-code platform that lets anyone build web apps without writing any code.",
	icon: "Kapix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kapix-studio:jsGlobal:0",
			kind: "jsGlobal",
			property: "__INITIAL_STATE__",
			valuePattern: new RegExp("KapixNoCode"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kapix-studio:jsGlobal:1",
			kind: "jsGlobal",
			property: "kapixVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
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
	implies: [
		"typescript",
		"vite",
	],
} as const satisfies TechnologyDefinition;
