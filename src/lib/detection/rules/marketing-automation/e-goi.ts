import type { TechnologyDefinition } from '../../types';

export const eGoiTechnologyDefinition = {
	id: "e-goi",
	name: "e-goi",
	website: "https://www.e-goi.com",
	description: "e-goi is a multichannel marketing automation software for ecommerce.",
	icon: "e-goi.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "e-goi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.e-goi\\.com\\/egoimmerce\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "e-goi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Egoimmerce",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "e-goi:jsGlobal:2",
			kind: "jsGlobal",
			property: "_egoiaq",
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
