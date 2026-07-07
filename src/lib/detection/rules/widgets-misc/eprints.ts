import type { TechnologyDefinition } from '../../types';

export const eprintsTechnologyDefinition = {
	id: "eprints",
	name: "EPrints",
	website: "https://www.eprints.org",
	description: "EPrints is an open-source platform for institutional repositories and research archives.",
	icon: "EPrints.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "eprints:jsGlobal:0",
			kind: "jsGlobal",
			property: "EPJS_menu_template",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eprints:jsGlobal:1",
			kind: "jsGlobal",
			property: "EPrints",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eprints:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("EPrints ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eprints:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("eprints ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:eprints:eprints:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
