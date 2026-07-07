import type { TechnologyDefinition } from '../../types';

export const gravityTechnologyDefinition = {
	id: "gravity",
	name: "Gravity",
	website: "https://gravi.org",
	description: "Gravity is a live chat solution designed to facilitate real-time communication for businesses.",
	icon: "Gravity.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gravity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gravi\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gravity:jsGlobal:1",
			kind: "jsGlobal",
			property: "gravi_api.chatMode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gravity:jsGlobal:2",
			kind: "jsGlobal",
			property: "gravi_init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gravity:jsGlobal:3",
			kind: "jsGlobal",
			property: "gravi_version",
			valuePattern: new RegExp("^([\\d\\.]+[a-z]?)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
