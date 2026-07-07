import type { TechnologyDefinition } from '../../types';

export const setmoreTechnologyDefinition = {
	id: "setmore",
	name: "Setmore",
	website: "https://www.setmore.com",
	description: "Setmore is a cloud-based appointment scheduling solution.",
	icon: "Setmore.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "setmore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.setmore\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "setmore:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/setmore-appointments\\/script\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "setmore:jsGlobal:2",
			kind: "jsGlobal",
			property: "setmorePopup",
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
