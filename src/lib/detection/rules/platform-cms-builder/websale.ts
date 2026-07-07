import type { TechnologyDefinition } from '../../types';

export const websaleTechnologyDefinition = {
	id: "websale",
	name: "Websale",
	website: "https://websale.de",
	icon: "Websale.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "websale:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^websale_ac$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
