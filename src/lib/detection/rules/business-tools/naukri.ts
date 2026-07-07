import type { TechnologyDefinition } from '../../types';

export const naukriTechnologyDefinition = {
	id: "naukri",
	name: "Naukri",
	website: "https://www.naukri.com",
	description: "Naukri is a job board that connects employers and job seekers by listing employment opportunities across industries and locations.",
	icon: "Naukri.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "naukri:jsGlobal:0",
			kind: "jsGlobal",
			property: "naukriWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "naukri:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.naukri\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
