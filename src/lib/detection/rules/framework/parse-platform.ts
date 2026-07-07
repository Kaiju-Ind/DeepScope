import type { TechnologyDefinition } from '../../types';

export const parsePlatformTechnologyDefinition = {
	id: "parse-platform",
	name: "Parse Platform",
	website: "https://parseplatform.org",
	description: "Parse Platform is a backend framework offering built-in support for object and file storage, user authentication, push notifications, and a customizable dashboard.",
	icon: "ParsePlatform.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "parse-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.parsecdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
