import type { TechnologyDefinition } from '../../types';

export const knockoutJsTechnologyDefinition = {
	id: "knockout-js",
	name: "Knockout.js",
	website: "https://knockoutjs.com",
	description: "Knockout.js is basically a library written in JavaScript, based on MVVM pattern that helps developers build rich and responsive websites.",
	icon: "Knockout.js.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "knockout-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "ko.version",
			valuePattern: new RegExp("^(.+)$"),
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
