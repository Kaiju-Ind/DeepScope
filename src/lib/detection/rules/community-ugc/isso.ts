import type { TechnologyDefinition } from '../../types';

export const issoTechnologyDefinition = {
	id: "isso",
	name: "Isso",
	website: "https://github.com/posativ/isso/",
	description: "Isso is a lightweight commenting server written in Python and JavaScript, referred to as \"Ich schrei sonst\" in German.",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "isso:jsGlobal:0",
			kind: "jsGlobal",
			property: "Isso.fetchComments",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
