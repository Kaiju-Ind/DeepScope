import type { TechnologyDefinition } from '../../types';

export const grapheneTechnologyDefinition = {
	id: "graphene",
	name: "Graphene",
	website: "https://www.graphene-theme.com/graphene-theme",
	description: "Graphene is a WordPress theme created by Graphene Themes.",
	icon: "Graphene Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "graphene:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/graphene(?:-plus)?\\/.+graphene\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "graphene:jsGlobal:1",
			kind: "jsGlobal",
			property: "grapheneGetInfScrollBtnLbl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "graphene:jsGlobal:2",
			kind: "jsGlobal",
			property: "grapheneJS.templateUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
