import type { TechnologyDefinition } from '../../types';

export const proloFinderTechnologyDefinition = {
	id: "prolo-finder",
	name: "Prolo Finder",
	website: "https://www.prolofinder.com",
	description: "Prolo is a tool that adds a store locator feature to any website, enabling users to find nearby store locations through an interactive map or search interface.",
	icon: "ProloFinder.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "prolo-finder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.prolofinder\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prolo-finder:jsGlobal:1",
			kind: "jsGlobal",
			property: "proloConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prolo-finder:jsGlobal:2",
			kind: "jsGlobal",
			property: "proloFinderState",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
