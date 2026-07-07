import type { TechnologyDefinition } from '../../types';

export const mentayaTechnologyDefinition = {
	id: "mentaya",
	name: "Mentaya",
	website: "https://www.mentaya.com",
	description: "Mentaya is a platform that simplifies mental health care by leveraging out-of-network benefits to reduce patient costs while ensuring therapists receive full fees.",
	icon: "Mentaya.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mentaya:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.mentaya.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mentaya:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Mentaya", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mentaya:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("mentaya", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
