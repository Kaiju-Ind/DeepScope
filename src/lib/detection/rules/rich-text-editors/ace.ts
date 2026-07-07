import type { TechnologyDefinition } from '../../types';

export const aceTechnologyDefinition = {
	id: "ace",
	name: "Ace",
	website: "https://github.com/ajaxorg/ace",
	description: "Ace is an embeddable code editor written in JavaScript.",
	icon: "Ace.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "ace:jsGlobal:0",
			kind: "jsGlobal",
			property: "ace.EditSession",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ace:jsGlobal:1",
			kind: "jsGlobal",
			property: "ace.Editor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ace:jsGlobal:2",
			kind: "jsGlobal",
			property: "ace.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
