import type { TechnologyDefinition } from '../../types';

export const jacklistTechnologyDefinition = {
	id: "jacklist",
	name: "Jacklist",
	website: "https://jacklist.ltd",
	description: "Jacklist is a website builder system developed in Japan.",
	icon: "Jacklist.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jacklist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.jacklist\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jacklist:jsGlobal:1",
			kind: "jsGlobal",
			property: "homepage_api_url",
			valuePattern: new RegExp("api\\.jacklist\\.jp"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
