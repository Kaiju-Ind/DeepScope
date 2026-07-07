import type { TechnologyDefinition } from '../../types';

export const solveMediaTechnologyDefinition = {
	id: "solve-media",
	name: "Solve Media",
	website: "https://solvemedia.com",
	icon: "Solve Media.png",
	categories: [
		"security",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "solve-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/api\\.solvemedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solve-media:jsGlobal:1",
			kind: "jsGlobal",
			property: "ACPuzzle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solve-media:jsGlobal:2",
			kind: "jsGlobal",
			property: "_ACPuzzle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solve-media:jsGlobal:3",
			kind: "jsGlobal",
			property: "_adcopy-puzzle-image-image",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solve-media:jsGlobal:4",
			kind: "jsGlobal",
			property: "adcopy-puzzle-image-image",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
