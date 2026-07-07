import type { TechnologyDefinition } from '../../types';

export const farcryTechnologyDefinition = {
	id: "farcry",
	name: "FarCry",
	website: "https://www.farcrycore.org",
	description: "FarCry is a web application framework that helps CFML developers build tailor-made content solutions.",
	icon: "FarCry.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "farcry:jsGlobal:0",
			kind: "jsGlobal",
			property: "farcryForgotPassword",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "farcry:jsGlobal:1",
			kind: "jsGlobal",
			property: "farcryLogin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "farcry:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^FARCRYDEVICETYPE$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "farcry:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^farcrydevicetype$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
