import type { TechnologyDefinition } from '../../types';

export const myonlinestoreTechnologyDefinition = {
	id: "myonlinestore",
	name: "MyOnlineStore",
	website: "https://www.myonlinestore.com/",
	description: "MyOnlineStore is a web shop system in the Netherlands.",
	icon: "MyOnlineStore.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "myonlinestore:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mijnwebwinkel", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "myonlinestore:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mijnwebwinkel", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
