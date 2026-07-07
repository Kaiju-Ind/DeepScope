import type { TechnologyDefinition } from '../../types';

export const sitooTechnologyDefinition = {
	id: "sitoo",
	name: "Sitoo",
	website: "https://sitoo.com",
	description: "Sitoo is a POS and Unified Commerce Platform for global retailers.",
	icon: "Sitoo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitoo:jsGlobal:0",
			kind: "jsGlobal",
			property: "SitooOnLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sitoo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.sitoo\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
