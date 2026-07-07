import type { TechnologyDefinition } from '../../types';

export const advinTechnologyDefinition = {
	id: "advin",
	name: "Advin",
	website: "https://www.advin.cz",
	description: "Advin is a provider of ecommerce solutions and tailored web information systems for clients.",
	icon: "Advin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "advin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.advin\\.cz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "advin:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("ADVIN \\[www\\.advin\\.cz\\]", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "advin:meta:2",
			kind: "meta",
			key: "http-equiv.Reply-to",
			valuePattern: new RegExp("info\\(at\\)advin\\.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "advin:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("advin \\[www\\.advin\\.cz\\]", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "advin:meta:4",
			kind: "meta",
			key: "http-equiv.reply-to",
			valuePattern: new RegExp("info\\(at\\)advin\\.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
