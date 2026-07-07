import type { TechnologyDefinition } from '../../types';

export const forentoTechnologyDefinition = {
	id: "forento",
	name: "Forento",
	website: "https://forento.io",
	description: "Forento is a platform that allows selling courses and digital downloads while managing creation, marketing, and scaling of online businesses under custom branding.",
	icon: "Forento.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "forento:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.forento\\.site"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "forento:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^forento$", "i"),
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
} as const satisfies TechnologyDefinition;
