import type { TechnologyDefinition } from '../../types';

export const eMonsiteTechnologyDefinition = {
	id: "e-monsite",
	name: "E-monsite",
	website: "https://www.e-monsite.com",
	description: "E-monsite is a web-based platform that allows users to create and customise their own websites using a range of templates and features, without requiring coding or technical skills.",
	icon: "E-monsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "e-monsite:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^e-monsite\\s\\(e-monsite\\.com\\)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
