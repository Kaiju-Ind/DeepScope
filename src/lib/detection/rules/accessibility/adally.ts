import type { TechnologyDefinition } from '../../types';

export const adallyTechnologyDefinition = {
	id: "adally",
	name: "Adally",
	website: "https://adally.com/",
	description: "Adally provides real-time website accessibility solutions, including free accessibility scans and widgets, to help websites comply with ADA, WCAG 2.1, and Section 508 standards.",
	icon: "Adally.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "adally:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cloudfront\\.net\\/.*\\/adally\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
