import type { TechnologyDefinition } from '../../types';

export const transifexTechnologyDefinition = {
	id: "transifex",
	name: "Transifex",
	website: "https://www.transifex.com",
	description: "Transifex is a cloud-based platform for managing the translation and localization of digital content.",
	icon: "transifex.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "transifex:jsGlobal:0",
			kind: "jsGlobal",
			property: "Transifex.live.lib_version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:transifex:transifex:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
