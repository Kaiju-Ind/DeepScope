import type { TechnologyDefinition } from '../../types';

export const ferretOneTechnologyDefinition = {
	id: "ferret-one",
	name: "Ferret One",
	website: "https://ferret-one.com",
	description: "Ferret One is a personal website builder tool developed in Asia.",
	icon: "FerretOne.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ferret-one:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("ferret-one"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
