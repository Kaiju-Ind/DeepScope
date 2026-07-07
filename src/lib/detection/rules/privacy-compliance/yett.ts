import type { TechnologyDefinition } from '../../types';

export const yettTechnologyDefinition = {
	id: "yett",
	name: "Yett",
	website: "https://github.com/elbywan/yett",
	description: "Yett is a small webpage library to control the execution of (third party) scripts like analytics.",
	icon: "Yett.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "yett:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/yett@([\\d\\.]+)\\/dist\\/yett\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yett:jsGlobal:1",
			kind: "jsGlobal",
			property: "YETT_BLACKLIST",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
