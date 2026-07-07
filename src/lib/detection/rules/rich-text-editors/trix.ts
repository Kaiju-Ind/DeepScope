import type { TechnologyDefinition } from '../../types';

export const trixTechnologyDefinition = {
	id: "trix",
	name: "Trix",
	website: "https://trix-editor.org",
	description: "Trix is an open-source project from Basecamp, the creators of Ruby on Rails.",
	icon: "trix.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "trix:jsGlobal:0",
			kind: "jsGlobal",
			property: "Trix.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
