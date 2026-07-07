import type { TechnologyDefinition } from '../../types';

export const mintoxTechnologyDefinition = {
	id: "mintox",
	name: "Mintox",
	website: "https://www.mintox.com",
	description: "Mintox is a business software designed to streamline operations and enhance efficiency.",
	icon: "Mintox.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mintox:jsGlobal:0",
			kind: "jsGlobal",
			property: "MintoxJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mintox:jsGlobal:1",
			kind: "jsGlobal",
			property: "mintoxPaging",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mintox:jsGlobal:2",
			kind: "jsGlobal",
			property: "mintoxTrim",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mintox:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Mintox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mintox:meta:4",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^mintox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
