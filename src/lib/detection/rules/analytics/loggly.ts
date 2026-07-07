import type { TechnologyDefinition } from '../../types';

export const logglyTechnologyDefinition = {
	id: "loggly",
	name: "Loggly",
	website: "https://www.loggly.com",
	description: "Loggly is a cloud-based log management service provider.",
	icon: "Loggly.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "loggly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.loggly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loggly:dom:1",
			kind: "dom",
			selector: "link[href*='.loggly.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "loggly:jsGlobal:2",
			kind: "jsGlobal",
			property: "LogglyTracker",
			description: "Page-owned global matches a known technology marker.",
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
