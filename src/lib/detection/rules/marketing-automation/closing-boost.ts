import type { TechnologyDefinition } from '../../types';

export const closingBoostTechnologyDefinition = {
	id: "closing-boost",
	name: "Closing Boost",
	website: "https://closingboost.com",
	description: "Closing Boost is a sales pipeline management and marketing automation platform designed to capture leads and nurture prospects.",
	icon: "ClosingBoost.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "closing-boost:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.closingboost\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
