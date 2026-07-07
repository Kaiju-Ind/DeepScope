import type { TechnologyDefinition } from '../../types';

export const mywebsiteTechnologyDefinition = {
	id: "mywebsite",
	name: "MyWebsite",
	website: "https://www.ionos.com",
	description: "MyWebsite is website builder designed for easy editing and fast results.",
	icon: "MyWebsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mywebsite:jsGlobal:0",
			kind: "jsGlobal",
			property: "SystemID",
			valuePattern: new RegExp("^.*1AND1.*$"),
			version: {
				source: "match",
				template: "8",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mywebsite:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("IONOS MyWebsite", "i"),
			version: {
				source: "match",
				template: "8",
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mywebsite:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ionos mywebsite", "i"),
			version: {
				source: "match",
				template: "8",
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	excludes: [
		"jimdo",
	],
} as const satisfies TechnologyDefinition;
