import type { TechnologyDefinition } from '../../types';

export const zinniaTechnologyDefinition = {
	id: "zinnia",
	name: "Zinnia",
	website: "https://django-blog-zinnia.com",
	description: "Zimbra is an is a collaborative software suite that includes an email server and a web client.",
	icon: "Zinnia.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "zinnia:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Zinnia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zinnia:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zinnia", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"django",
	],
} as const satisfies TechnologyDefinition;
