import type { TechnologyDefinition } from '../../types';

export const laravelTechnologyDefinition = {
	id: "laravel",
	name: "Laravel",
	website: "https://laravel.com",
	description: "Laravel is a free, open-source PHP web framework.",
	icon: "Laravel.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "laravel:jsGlobal:0",
			kind: "jsGlobal",
			property: "Laravel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laravel:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^laravel_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:laravel:laravel:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
