import type { TechnologyDefinition } from '../../types';

export const gamoogaTechnologyDefinition = {
	id: "gamooga",
	name: "Gamooga",
	website: "https://www.gsecondscreen.com",
	description: "Gamooga is a marketing automation solution which helps businesses deliver personalized actions at their customers through various channels such as email, web, mobile, social and display.",
	icon: "Gamooga.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "gamooga:jsGlobal:0",
			kind: "jsGlobal",
			property: "triggerGamoogaInFooter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gamooga:jsGlobal:1",
			kind: "jsGlobal",
			property: "triggerGamoogaInFooterChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
