import type { TechnologyDefinition } from '../../types';

export const rcodeVisionTechnologyDefinition = {
	id: "rcode-vision",
	name: "Rcode Vision",
	website: "https://www.rcodevision.com",
	description: "Rcode Vision is a platform that develops and delivers web applications.",
	icon: "RcodeVision.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "rcode-vision:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Rcode Vision$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rcode-vision:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^rcode vision$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
