import type { TechnologyDefinition } from '../../types';

export const mynetcapTechnologyDefinition = {
	id: "mynetcap",
	name: "Mynetcap",
	website: "https://www.netcap-creation.fr",
	icon: "Mynetcap.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mynetcap:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mynetcap", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mynetcap:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mynetcap", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
