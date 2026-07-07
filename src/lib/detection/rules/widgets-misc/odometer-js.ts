import type { TechnologyDefinition } from '../../types';

export const odometerJsTechnologyDefinition = {
	id: "odometer-js",
	name: "Odometer.js",
	website: "https://github.hubspot.com/odometer/docs/welcome",
	description: "Odometer.js is a JavaScript library that smoothly animates transitions between numeric values for counters and metrics.",
	icon: "HubSpot.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "odometer-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/odometer\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "odometer-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Odometer.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
