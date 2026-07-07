import type { TechnologyDefinition } from '../../types';

export const jahiaDxTechnologyDefinition = {
	id: "jahia-dx",
	name: "Jahia DX",
	website: "https://www.jahia.com/dx",
	icon: "JahiaDX.svg",
	categories: [
		"platform-cms-builder",
		"developer-tooling",
	],
	rules: [
		{
			id: "jahia-dx:html:0",
			kind: "html",
			pattern: new RegExp("<script id=\"staticAssetAggregatedJavascrip"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jahia-dx:dom:1",
			kind: "dom",
			selector: "script#staticAssetAggregatedJavascrip",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jahia-dx:html:2",
			kind: "html",
			pattern: new RegExp("<script id=\"staticassetaggregatedjavascrip"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
