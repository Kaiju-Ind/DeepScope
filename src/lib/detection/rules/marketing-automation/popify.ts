import type { TechnologyDefinition } from '../../types';

export const popifyTechnologyDefinition = {
	id: "popify",
	name: "Popify",
	website: "https://popify.app",
	description: "Popify is a sales push notification system designed to deliver real-time alerts that drive engagement and conversions.",
	icon: "Popify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "popify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.popify\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "popify:jsGlobal:1",
			kind: "jsGlobal",
			property: "PopifyLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "popify:jsGlobal:2",
			kind: "jsGlobal",
			property: "PopifyNotifications",
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
