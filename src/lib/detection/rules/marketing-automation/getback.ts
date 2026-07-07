import type { TechnologyDefinition } from '../../types';

export const getbackTechnologyDefinition = {
	id: "getback",
	name: "Getback",
	website: "https://www.getback.app",
	description: "Getback is a web push conversion optimization tool developed by AdFocus to help improve engagement and campaign performance through browser-based notifications.",
	icon: "Getback.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "getback:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.getback\\.ch"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
