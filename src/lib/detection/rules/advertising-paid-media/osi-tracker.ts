import type { TechnologyDefinition } from '../../types';

export const osiTrackerTechnologyDefinition = {
	id: "osi-tracker",
	name: "OSI Tracker",
	website: "https://ositracker.com",
	description: "OSI Tracker is an affiliate marketing and tracking software.",
	icon: "OSITracker.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "osi-tracker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ositracker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
