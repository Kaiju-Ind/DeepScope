import type { TechnologyDefinition } from '../../types';

export const heysummitTechnologyDefinition = {
	id: "heysummit",
	name: "HeySummit",
	website: "https://heysummit.com",
	description: "HeySummit is a platform facilitating the organization of virtual summits.",
	icon: "HeySummit.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "heysummit:jsGlobal:0",
			kind: "jsGlobal",
			property: "heySummitAnimationItems",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:jsGlobal:1",
			kind: "jsGlobal",
			property: "prepHeySummitAnimationParent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:jsGlobal:2",
			kind: "jsGlobal",
			property: "resetHeySummitAnimation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:jsGlobal:3",
			kind: "jsGlobal",
			property: "startHeySummitAnimation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:jsGlobal:4",
			kind: "jsGlobal",
			property: "startHeySummitAnimationLoadTop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:jsGlobal:5",
			kind: "jsGlobal",
			property: "stopHeySummitAnimation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heysummit:meta:6",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^HeySummit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "heysummit:meta:7",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^heysummit$", "i"),
			description: "Meta tag matches a known technology marker.",
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
