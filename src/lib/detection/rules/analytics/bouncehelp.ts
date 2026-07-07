import type { TechnologyDefinition } from '../../types';

export const bouncehelpTechnologyDefinition = {
	id: "bouncehelp",
	name: "BounceHelp",
	website: "https://bouncehelp.com",
	description: "BounceHelp is a website engagement platform that enables real-time visitor interaction, behavior tracking, and on-site communication tools to help analyze user activity and improve engagement across web pages.",
	icon: "BounceHelp.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "bouncehelp:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("code\\.bouncehelp\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
