import type { TechnologyDefinition } from '../../types';

export const terminusTechnologyDefinition = {
	id: "terminus",
	name: "Terminus",
	website: "https://terminus.com",
	description: "Terminus is a platform that helps identify target audiences, deliver relevant messages across multiple channels, integrate sales teams throughout the revenue process, and measure performance across all activities.",
	icon: "Terminus.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "terminus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.terminus\\.services\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
