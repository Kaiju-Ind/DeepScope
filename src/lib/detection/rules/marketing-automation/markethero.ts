import type { TechnologyDefinition } from '../../types';

export const marketheroTechnologyDefinition = {
	id: "markethero",
	name: "MarketHero",
	website: "https://markethero.io",
	description: "Market Hero is a platform that automates ROI calculations for ecommerce businesses, streamlining financial performance tracking and providing data-driven insights.",
	icon: "MarketHero.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "markethero:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("tracking\\.markethero\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
