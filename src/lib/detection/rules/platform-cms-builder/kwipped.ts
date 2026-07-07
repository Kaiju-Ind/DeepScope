import type { TechnologyDefinition } from '../../types';

export const kwippedTechnologyDefinition = {
	id: "kwipped",
	name: "Kwipped",
	website: "https://kwipped.com",
	description: "Kwipped is an online marketplace connecting businesses and individuals with providers of equipment rental and leasing.",
	icon: "Kwipped.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kwipped:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.kwipped\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kwipped:jsGlobal:1",
			kind: "jsGlobal",
			property: "init_kwipped_approve_snippet",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kwipped:jsGlobal:2",
			kind: "jsGlobal",
			property: "kwipped_approve",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
