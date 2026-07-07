import type { TechnologyDefinition } from '../../types';

export const imunify360TechnologyDefinition = {
	id: "imunify360",
	name: "Imunify360",
	website: "https://www.imunify360.com",
	description: "Imunify360 is a comprehensive security platform for Linux web servers which utilises machine learning technology and other advanced techniques to provide protection against various types of cyber threats, such as malware, viruses, and other attacks.",
	icon: "Imunify360.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "imunify360:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("imunify360-webshield\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "imunify360:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("imunify360-webshield\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
