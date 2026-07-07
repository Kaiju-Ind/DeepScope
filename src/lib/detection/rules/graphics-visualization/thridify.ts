import type { TechnologyDefinition } from '../../types';

export const thridifyTechnologyDefinition = {
	id: "thridify",
	name: "Thridify",
	website: "https://www.thridify.store",
	description: "Thirdify is a tool that enables businesses to convert browsers into buyers using 3D and AR technologies, with no app installation or coding required.",
	icon: "Thridify.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "thridify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.thridify\\.store"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "thridify:jsGlobal:1",
			kind: "jsGlobal",
			property: "getThridifyFrame",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thridify:jsGlobal:2",
			kind: "jsGlobal",
			property: "thridifyData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thridify:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("thridify\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
