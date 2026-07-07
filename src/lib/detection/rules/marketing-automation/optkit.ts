import type { TechnologyDefinition } from '../../types';

export const optkitTechnologyDefinition = {
	id: "optkit",
	name: "OptKit",
	website: "https://optkit.com",
	description: "OptKit is a platform that delivers real-time, behavior-triggered calls to action based on user interactions and events across digital properties.",
	icon: "OptKit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "optkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.optkit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
