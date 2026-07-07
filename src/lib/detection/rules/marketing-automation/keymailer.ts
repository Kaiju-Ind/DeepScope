import type { TechnologyDefinition } from '../../types';

export const keymailerTechnologyDefinition = {
	id: "keymailer",
	name: "Keymailer",
	website: "https://keymailer.co",
	description: "Keymailer is a game influencer marketing platform that integrates creators, software, and services into one portal.",
	icon: "Keymailer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "keymailer:jsGlobal:0",
			kind: "jsGlobal",
			property: "Keymailer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "keymailer:jsGlobal:1",
			kind: "jsGlobal",
			property: "KeymailerJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "keymailer:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Keymailer$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "keymailer:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^keymailer$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
