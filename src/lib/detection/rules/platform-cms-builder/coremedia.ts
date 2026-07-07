import type { TechnologyDefinition } from '../../types';

export const coremediaTechnologyDefinition = {
	id: "coremedia",
	name: "CoreMedia",
	website: "https://www.coremedia.com",
	description: "CoreMedia is an enterprise-grade, Java-based content management system used to manage, publish, and deliver digital content across websites and channels.",
	icon: "CoreMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "coremedia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.coremedia\\.cloud\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coremedia:jsGlobal:1",
			kind: "jsGlobal",
			property: "coremedia.blueprint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coremedia:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^CoreMedia C(?:ontent Cloud|MS)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "coremedia:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^coremedia c(?:ontent cloud|ms)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
