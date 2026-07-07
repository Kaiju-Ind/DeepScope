import type { TechnologyDefinition } from '../../types';

export const newtTechnologyDefinition = {
	id: "newt",
	name: "Newt",
	website: "https://www.newt.so",
	description: "Newt is a headless CMS that allows you to create and manage structured content and distribute it to a variety of channels.",
	icon: "Newt.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "newt:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.newt\\.so"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
