import type { TechnologyDefinition } from '../../types';

export const spothopperTechnologyDefinition = {
	id: "spothopper",
	name: "SpotHopper",
	website: "https://www.spothopperapp.com",
	description: "SpotHopper is an all-in-one marketing and online revenue platform for restaurants.",
	icon: "SpotHopper.png",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "spothopper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.spotapps\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spothopper:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spothopper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
