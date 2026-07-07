import type { TechnologyDefinition } from '../../types';

export const softtrTechnologyDefinition = {
	id: "softtr",
	name: "SoftTr",
	website: "https://www.softtr.com",
	description: "SoftTr is a company that provides software solutions for ecommerce, web hosting, and domain registration services.",
	icon: "softtr.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "softtr:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("SoftTr E-Ticaret Sitesi Yazılımı", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "softtr:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("softtr e-ticaret sitesi yazılımı", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
