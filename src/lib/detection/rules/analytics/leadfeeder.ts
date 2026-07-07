import type { TechnologyDefinition } from '../../types';

export const leadfeederTechnologyDefinition = {
	id: "leadfeeder",
	name: "Leadfeeder",
	website: "https://www.leadfeeder.com",
	description: "Leadfeeder is a B2B visitor identification software that tracks and identifies companies that visit your website.",
	icon: "Leadfeeder.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leadfeeder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leadfeeder\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadfeeder:jsGlobal:1",
			kind: "jsGlobal",
			property: "ldfdr.getTracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leadfeeder:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.(?:lfeeder|leadfeeder)\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "leadfeeder:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.(?:lfeeder|leadfeeder)\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
