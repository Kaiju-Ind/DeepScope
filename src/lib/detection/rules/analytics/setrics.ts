import type { TechnologyDefinition } from '../../types';

export const setricsTechnologyDefinition = {
	id: "setrics",
	name: "Setrics",
	website: "https://setrics.com",
	description: "Setrics is an omni-channel marketing and analysis platform that enables businesses to track and optimize customer interactions across multiple channels.",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "setrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.setrics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "setrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "setrics_tracking.track_goal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
