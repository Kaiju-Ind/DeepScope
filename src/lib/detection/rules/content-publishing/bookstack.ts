import type { TechnologyDefinition } from '../../types';

export const bookstackTechnologyDefinition = {
	id: "bookstack",
	name: "BookStack",
	website: "https://www.bookstackapp.com",
	description: "BookStack is a simple, open-source, self-hosted, easy-to-use platform for organising and storing information.",
	icon: "BookStack.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "bookstack:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^bookstack_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:bookstackapp:bookstack:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
