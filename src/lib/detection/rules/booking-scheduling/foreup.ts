import type { TechnologyDefinition } from '../../types';

export const foreupTechnologyDefinition = {
	id: "foreup",
	name: "ForeUP",
	website: "https://www.foreupgolf.com",
	description: "ForeUP is a golf course management platform that provides integrated tools for operations in a single system.",
	icon: "ForeUP.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "foreup:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("foreupsoftware\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
