import type { TechnologyDefinition } from '../../types';

export const stardekkTechnologyDefinition = {
	id: "stardekk",
	name: "Stardekk",
	website: "https://www.stardekk.com/blog",
	description: "Stardekk is a platform that provides hotel web design solutions.",
	icon: "Stardekk.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stardekk:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.stardekk\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stardekk:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Stardekk$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "stardekk:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^Stardekk$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "stardekk:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^stardekk$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "stardekk:meta:4",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^stardekk$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
