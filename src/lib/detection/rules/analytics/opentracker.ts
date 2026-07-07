import type { TechnologyDefinition } from '../../types';

export const opentrackerTechnologyDefinition = {
	id: "opentracker",
	name: "Opentracker",
	website: "https://www.opentracker.net",
	description: "Opentracker is a real-time analytics tool that tracks website traffic, user behavior, and engagement.",
	icon: "Opentracker.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "opentracker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.opentracker\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
