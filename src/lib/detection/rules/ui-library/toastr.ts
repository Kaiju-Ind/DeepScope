import type { TechnologyDefinition } from '../../types';

export const toastrTechnologyDefinition = {
	id: "toastr",
	name: "toastr",
	website: "https://github.com/CodeSeven/toastr",
	description: "toastr is a Javascript library for non-blocking notifications. The goal is to create a simple core library that can be customized and extended.",
	icon: "toastr.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "toastr:jsGlobal:0",
			kind: "jsGlobal",
			property: "toastr.version",
			valuePattern: new RegExp("(.*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
