import type { TechnologyDefinition } from '../../types';

export const programiaTechnologyDefinition = {
	id: "programia",
	name: "Programia",
	website: "https://www.programia.eu",
	description: "Programia is a producer of advanced B2C and B2B systems integrated with ERP and economic systems.",
	icon: "Programia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "programia:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Programia s\\.r\\.o\\., e-mail: info@programia\\.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "programia:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("programia s\\.r\\.o\\., e-mail: info@programia\\.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
