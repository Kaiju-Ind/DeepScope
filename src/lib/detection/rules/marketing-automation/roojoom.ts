import type { TechnologyDefinition } from '../../types';

export const roojoomTechnologyDefinition = {
	id: "roojoom",
	name: "Roojoom",
	website: "https://www.roojoom.com",
	description: "Roojoom is a content marketing platform that converts content into revenue, designed for guided browsing.",
	icon: "Roojoom.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "roojoom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.roojoom\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "roojoom:jsGlobal:1",
			kind: "jsGlobal",
			property: "RoojoomsGridCtrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
