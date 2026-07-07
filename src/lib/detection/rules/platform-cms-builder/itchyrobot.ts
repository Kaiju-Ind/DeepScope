import type { TechnologyDefinition } from '../../types';

export const itchyrobotTechnologyDefinition = {
	id: "itchyrobot",
	name: "iTCHYROBOT",
	website: "https://www.itchyrobot.co.uk",
	description: "iTCHYROBOT is a platform that develops school websites and provides marketing strategies to support communication, branding, and digital engagement for educational institutions.",
	icon: "iTCHYROBOT.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "itchyrobot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/itchyrobot_parent\\/js\\/"),
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
