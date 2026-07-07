import type { TechnologyDefinition } from '../../types';

export const editplusTechnologyDefinition = {
	id: "editplus",
	name: "EditPlus",
	website: "https://www.editplus.com",
	description: "EditPlus is a text, HTML, PHP, and Java editor with a Hex Viewer for Windows, offering Notepad replacement capabilities along with features for web authors and programmers.",
	icon: "EditPlus.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "editplus:meta:0",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("^EditPlus$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "editplus:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^editplus$", "i"),
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
