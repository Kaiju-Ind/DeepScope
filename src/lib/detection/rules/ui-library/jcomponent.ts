import type { TechnologyDefinition } from '../../types';

export const jcomponentTechnologyDefinition = {
	id: "jcomponent",
	name: "jComponent",
	website: "https://componentator.com",
	description: "jComponent is a platform offering open-source web components and icons for easy integration into web projects.",
	icon: "jComponent.png",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jcomponent:jsGlobal:0",
			kind: "jsGlobal",
			property: "MAIN.version",
			valuePattern: new RegExp(".*"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jcomponent:jsGlobal:1",
			kind: "jsGlobal",
			property: "MAIN.version",
			valuePattern: new RegExp("(.*)"),
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
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
