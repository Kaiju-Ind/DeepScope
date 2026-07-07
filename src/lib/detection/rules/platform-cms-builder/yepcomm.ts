import type { TechnologyDefinition } from '../../types';

export const yepcommTechnologyDefinition = {
	id: "yepcomm",
	name: "Yepcomm",
	website: "https://www.yepcomm.com.br",
	icon: "yepcomm.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yepcomm:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Yepcomm Tecnologia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yepcomm:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Yepcomm Tecnologia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yepcomm:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("yepcomm tecnologia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "yepcomm:meta:3",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("yepcomm tecnologia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
