import type { TechnologyDefinition } from '../../types';

export const kilkayaTechnologyDefinition = {
	id: "kilkaya",
	name: "Kilkaya",
	website: "https://www.kilkaya.com",
	description: "Kilkaya is a platform that simplifies analytics for publishers by consolidating data and automating reporting.",
	icon: "Kilkaya.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "kilkaya:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("Kilkaya"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kilkaya:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("kilkaya"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
