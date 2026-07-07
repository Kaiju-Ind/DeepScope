import type { TechnologyDefinition } from '../../types';

export const greydSuiteTechnologyDefinition = {
	id: "greyd-suite",
	name: "Greyd.Suite",
	website: "https://greyd.io/",
	description: "Greyd.Suite is an all-in-one platform designed to streamline WordPress business operations, integrating site management, design, and marketing tools into a unified system.",
	icon: "GreydSuite.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "greyd-suite:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.greyd\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "greyd-suite:jsGlobal:1",
			kind: "jsGlobal",
			property: "greyd.animations",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "greyd-suite:jsGlobal:2",
			kind: "jsGlobal",
			property: "greydFormSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:greyd:greyd.suite:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
