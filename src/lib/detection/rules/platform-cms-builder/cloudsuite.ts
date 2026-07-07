import type { TechnologyDefinition } from '../../types';

export const cloudsuiteTechnologyDefinition = {
	id: "cloudsuite",
	name: "CloudSuite",
	website: "https://cloudsuite.com",
	icon: "CloudSuite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cloudsuite:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^cs_secure_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
