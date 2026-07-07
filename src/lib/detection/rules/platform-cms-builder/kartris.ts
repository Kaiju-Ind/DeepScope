import type { TechnologyDefinition } from '../../types';

export const kartrisTechnologyDefinition = {
	id: "kartris",
	name: "Kartris",
	website: "https://www.kartris.com",
	description: "Kartris is an open-source ecommerce platform built with ASP.NET, designed for managing online stores.",
	icon: "Kartris.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kartris:jsGlobal:0",
			kind: "jsGlobal",
			property: "AddClassUpward__Kartris",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kartris:jsGlobal:1",
			kind: "jsGlobal",
			property: "Hover__KartrisMenu",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:cactusoft:kartris:*:*:*:*:*:*:*:*",
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
