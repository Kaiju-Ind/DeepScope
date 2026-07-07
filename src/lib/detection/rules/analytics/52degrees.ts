import type { TechnologyDefinition } from '../../types';

export const technology52degreesTechnologyDefinition = {
	id: "52degrees",
	name: "52Degrees",
	website: "https://51degrees.com",
	description: "52Degrees is a data platform formerly known as Handset Detection, providing real-time device and data insights for digital businesses.",
	icon: "52Degrees.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "52degrees:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.handsetdetection\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "52degrees:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("'api\\.handsetdetection\\.com"),
			description: "Script content contains a bounded technology signature.",
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
