import type { TechnologyDefinition } from '../../types';

export const synctrackTechnologyDefinition = {
	id: "synctrack",
	name: "Synctrack",
	website: "https://synctrack.io",
	description: "Synctrack is a platform that helps merchants improve the shopping experience and post-sale processes, including payment syncing and delivery tracking, to enhance revenue and customer loyalty.",
	icon: "Synctrack.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "synctrack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.synctrack\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
