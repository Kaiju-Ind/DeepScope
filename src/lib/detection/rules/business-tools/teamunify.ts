import type { TechnologyDefinition } from '../../types';

export const teamunifyTechnologyDefinition = {
	id: "teamunify",
	name: "TeamUnify",
	website: "https://www.teamunify.com",
	description: "TeamUnify is an all-in-one swim platform that simplifies swim team management.",
	icon: "TeamUnify.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "teamunify:jsGlobal:0",
			kind: "jsGlobal",
			property: "TeamUnifyUpdateSubsystem",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teamunify:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^TeamUnify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "teamunify:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^teamunify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
