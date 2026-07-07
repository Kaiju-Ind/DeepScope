import type { TechnologyDefinition } from '../../types';

export const trackfoxTechnologyDefinition = {
	id: "trackfox",
	name: "TrackFox",
	website: "https://trackfox.app",
	description: "TrackFox is a platform that links traffic patterns to revenue outcomes, providing clarity on which sources convert and which do not.",
	icon: "Trackfox.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trackfox:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("trackfox\\.app\\/script\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "trackfox:jsGlobal:1",
			kind: "jsGlobal",
			property: "trackfox.formatCurrency",
			description: "Page-owned global matches a known technology marker.",
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
