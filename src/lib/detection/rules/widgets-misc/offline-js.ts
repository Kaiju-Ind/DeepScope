import type { TechnologyDefinition } from '../../types';

export const offlineJsTechnologyDefinition = {
	id: "offline-js",
	name: "Offline.js",
	website: "https://github.hubspot.com/offline/docs/welcome",
	description: "Offline.js is a library that automatically alerts users when they have lost internet connectivity.",
	icon: "HubSpot.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "offline-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:bundles\\/[^/]+|assets\\/javascripts|js)\\/offline\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "offline-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Offline.confirmDown",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "offline-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Offline.state",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
