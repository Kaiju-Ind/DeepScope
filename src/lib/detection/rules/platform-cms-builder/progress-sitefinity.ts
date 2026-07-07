import type { TechnologyDefinition } from '../../types';

export const progressSitefinityTechnologyDefinition = {
	id: "progress-sitefinity",
	name: "Progress Sitefinity",
	website: "https://www.sitefinity.com",
	description: "Progress Sitefinity is a content management system (CMS) that you use to create, store, manage, and present content on your website.",
	icon: "Sitefinity.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "progress-sitefinity:jsGlobal:0",
			kind: "jsGlobal",
			property: "sfDataIntell",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "progress-sitefinity:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sitefinity\\s([\\S]{3,9})", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "progress-sitefinity:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sitefinity\\s([\\s]{3,9})", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:progress:sitefinity:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
