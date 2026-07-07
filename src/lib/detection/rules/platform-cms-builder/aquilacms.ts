import type { TechnologyDefinition } from '../../types';

export const aquilacmsTechnologyDefinition = {
	id: "aquilacms",
	name: "AquilaCMS",
	website: "https://www.aquila-cms.com/",
	description: "AquilaCMS is a fullstack, headless CMS written in JavaScript.",
	icon: "AquilaCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aquilacms:meta:0",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("AquilaCMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aquilacms:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("aquilacms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"amazon-web-services",
		"mongodb",
		"next-js",
		"node-js",
		"react",
	],
} as const satisfies TechnologyDefinition;
