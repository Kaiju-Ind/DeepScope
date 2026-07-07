import type { TechnologyDefinition } from '../../types';

export const justiaTechnologyDefinition = {
	id: "justia",
	name: "Justia",
	website: "https://www.justia.com",
	description: "Justia is a lawyer-based content management system (CMS).",
	icon: "Justia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "justia:jsGlobal:0",
			kind: "jsGlobal",
			property: "jmetadata",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "justia:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^SESSJUSTIA$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "justia:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^sessjustia$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
