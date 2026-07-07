import type { TechnologyDefinition } from '../../types';

export const ionicTechnologyDefinition = {
	id: "ionic",
	name: "Ionic",
	website: "https://ionicframework.com",
	description: "Ionic is an open-source framework that enables developers to create cross-platform mobile, web, and desktop applications using web technologies like HTML, CSS, and JavaScript.",
	icon: "ionic.png",
	categories: [
		"styling-library",
		"framework",
	],
	rules: [
		{
			id: "ionic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Ionic.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ionic:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ionic.version",
			valuePattern: new RegExp("^(.+)$"),
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
