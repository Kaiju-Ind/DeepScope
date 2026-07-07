import type { TechnologyDefinition } from '../../types';

export const birdseedTechnologyDefinition = {
	id: "birdseed",
	name: "BirdSeed",
	website: "https://birdseed.io",
	description: "BirdSeed is a suite of website tools designed to enhance customer experience, enable real-time engagement, and support revenue growth.",
	icon: "BirdSeed.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "birdseed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.birdseed\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "birdseed:jsGlobal:1",
			kind: "jsGlobal",
			property: "birdseed_widget_controller",
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
