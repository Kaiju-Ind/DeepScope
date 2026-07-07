import type { TechnologyDefinition } from '../../types';

export const vaptchaTechnologyDefinition = {
	id: "vaptcha",
	name: "VAPTCHA",
	website: "https://en.vaptcha.com",
	description: "VAPTCHA is the abbreviation of (Variation Analysis based Public Turing Test to Tell Computers and Humans Apart), also known as gesture verification code, is a human-machine verification solution based on artificial intelligence and big data.",
	icon: "VAPTCHA.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "vaptcha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vaptcha\\.com\\/v([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vaptcha:jsGlobal:1",
			kind: "jsGlobal",
			property: "vaptcha",
			description: "Page-owned global matches a known technology marker.",
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
