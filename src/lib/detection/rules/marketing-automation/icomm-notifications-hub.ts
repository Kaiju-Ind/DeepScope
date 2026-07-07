import type { TechnologyDefinition } from '../../types';

export const icommNotificationsHubTechnologyDefinition = {
	id: "icomm-notifications-hub",
	name: "icomm - Notifications Hub",
	website: "https://icommkt.com",
	description: "Notifications Hub is an omnichannel marketing automation platform powered by AI.0.",
	icon: "icomm.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "icomm-notifications-hub:jsGlobal:0",
			kind: "jsGlobal",
			property: "wpnObject.origin",
			valuePattern: new RegExp("2"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"icomm",
	],
	excludes: [
		"titanpush",
	],
} as const satisfies TechnologyDefinition;
