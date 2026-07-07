import type { TechnologyDefinition } from '../../types';

export const speedofMeTechnologyDefinition = {
	id: "speedof-me",
	name: "SpeedOf.Me",
	website: "https://speedof.me/api.html",
	description: "SpeedOf. Me is a client-based bandwidth test API that measures internet speed without requiring plugins, using HTML5 and JavaScript for real-time results.",
	icon: "SpeedOfMe.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "speedof-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("speedof\\.me\\/api\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
