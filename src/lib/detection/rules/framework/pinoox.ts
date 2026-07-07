import type { TechnologyDefinition } from '../../types';

export const pinooxTechnologyDefinition = {
	id: "pinoox",
	name: "pinoox",
	website: "https://pinoox.com",
	description: "Pinoox is a software development company that provides custom solutions for web, mobile, and software applications.",
	icon: "pinoox.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "pinoox:jsGlobal:0",
			kind: "jsGlobal",
			property: "pinoox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pinoox:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^pinoox_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
