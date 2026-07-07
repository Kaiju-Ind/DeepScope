import type { TechnologyDefinition } from '../../types';

export const enonicTechnologyDefinition = {
	id: "enonic",
	name: "Enonic",
	website: "https://www.enonic.com",
	description: "Enonic is a platform that helps you to create digital experiences by structuring and composing content.",
	icon: "Enonic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enonic:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^com\\-enonic\\-app\\-ga_disabled$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "enonic:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Enonic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "enonic:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^enonic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
