import type { TechnologyDefinition } from '../../types';

export const wisycmsTechnologyDefinition = {
	id: "wisycms",
	name: "wisyCMS",
	website: "https://wisy.3we.de",
	icon: "wisyCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wisycms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^wisy CMS[ v]{0,3}([0-9.,]*)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wisycms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^wisy cms[ v]{0,3}([0-9.,]*)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
