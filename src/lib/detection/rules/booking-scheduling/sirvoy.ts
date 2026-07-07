import type { TechnologyDefinition } from '../../types';

export const sirvoyTechnologyDefinition = {
	id: "sirvoy",
	name: "Sirvoy",
	website: "https://sirvoy.com",
	description: "Sirvoy is a cloud-based hotel management software that streamlines various hotel operations, including reservation management, channel management, online booking, and property management.",
	icon: "Sirvoy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "sirvoy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("svSession"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sirvoy:jsGlobal:1",
			kind: "jsGlobal",
			property: "SirvoyBookingWidget",
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
