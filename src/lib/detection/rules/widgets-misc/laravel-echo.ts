import type { TechnologyDefinition } from '../../types';

export const laravelEchoTechnologyDefinition = {
	id: "laravel-echo",
	name: "Laravel Echo",
	website: "https://laravel.com/docs/broadcasting#client-side-installation",
	description: "Laravel Echo is a JavaScript library that makes it painless to subscribe to channels and listen for events broadcast by Laravel.",
	icon: "Laravel Echo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "laravel-echo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Echo.connector",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laravel-echo:jsGlobal:1",
			kind: "jsGlobal",
			property: "echo.connector",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
