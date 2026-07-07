import type { TechnologyDefinition } from '../../types';

export const ineventTechnologyDefinition = {
	id: "inevent",
	name: "InEvent",
	website: "https://inevent.com",
	description: "InEvent is event management software designed to streamline planning, organization, and execution of virtual, hybrid, and in-person events.",
	icon: "InEvent.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "inevent:meta:0",
			kind: "meta",
			key: "apiURL",
			valuePattern: new RegExp("inevent\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "inevent:meta:1",
			kind: "meta",
			key: "namespace",
			valuePattern: new RegExp("^InEvent$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "inevent:meta:2",
			kind: "meta",
			key: "apiurl",
			valuePattern: new RegExp("inevent\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "inevent:meta:3",
			kind: "meta",
			key: "namespace",
			valuePattern: new RegExp("^inevent$", "i"),
			description: "Meta tag matches a known technology marker.",
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
