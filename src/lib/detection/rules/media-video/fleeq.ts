import type { TechnologyDefinition } from '../../types';

export const fleeqTechnologyDefinition = {
	id: "fleeq",
	name: "Fleeq",
	website: "https://www.fleeq.io",
	description: "Fleeq is a platform facilitating the creation of training videos, followed by tracking, embedding, optimization, localization, and sharing capabilities.",
	icon: "Fleeq.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "fleeq:jsGlobal:0",
			kind: "jsGlobal",
			property: "FleeqSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:jsGlobal:1",
			kind: "jsGlobal",
			property: "FleeqSDKLight",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:jsGlobal:2",
			kind: "jsGlobal",
			property: "_fleeqBarSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:jsGlobal:3",
			kind: "jsGlobal",
			property: "_fleeqData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:jsGlobal:4",
			kind: "jsGlobal",
			property: "_fleeqWiki",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:jsGlobal:5",
			kind: "jsGlobal",
			property: "fleeqBarConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fleeq:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^__FLEEQ$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "fleeq:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^__fleeq$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
