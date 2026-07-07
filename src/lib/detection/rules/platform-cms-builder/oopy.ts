import type { TechnologyDefinition } from '../../types';

export const oopyTechnologyDefinition = {
	id: "oopy",
	name: "Oopy",
	website: "https://oopy.us/",
	description: "Oopy provides you with a simple and easy way to turn your Notion page into a performant website.",
	icon: "Oopy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oopy:jsGlobal:0",
			kind: "jsGlobal",
			property: "__OOPY__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"next-js",
		"notion",
	],
} as const satisfies TechnologyDefinition;
