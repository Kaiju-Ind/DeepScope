import type { TechnologyDefinition } from '../../types';

export const classyTechnologyDefinition = {
	id: "classy",
	name: "Classy",
	website: "https://www.classy.org/",
	description: "Classy is an online fundraising platform.",
	icon: "classy.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "classy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("classy\\.org"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "classy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Classy.clientId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
