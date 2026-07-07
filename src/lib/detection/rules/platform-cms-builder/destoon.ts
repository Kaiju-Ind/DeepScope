import type { TechnologyDefinition } from '../../types';

export const destoonTechnologyDefinition = {
	id: "destoon",
	name: "DESTOON",
	website: "https://destoon.com",
	description: "DESTOON is a website management solution designed to support the creation, organization, and operation of online platforms through integrated tools and features.",
	icon: "DESTOON.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "destoon:jsGlobal:0",
			kind: "jsGlobal",
			property: "destoon_cart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destoon:jsGlobal:1",
			kind: "jsGlobal",
			property: "destoon_chat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "destoon:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^DESTOON B2B - www\\.destoon\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "destoon:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^destoon b2b - www\\.destoon\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
