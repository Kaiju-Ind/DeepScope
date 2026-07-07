import type { TechnologyDefinition } from '../../types';

export const convertTechnologyDefinition = {
	id: "convert",
	name: "Convert",
	website: "https://www.convert.com",
	description: "Convert Experiences is an enterprise A/B testing and personalisation solution for conversion optimisation and data-driven decisions in high-traffic websites.",
	icon: "Convert.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "convert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.convertexperiments\\.com\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convert:jsGlobal:1",
			kind: "jsGlobal",
			property: "convert",
			confidence: 34,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convert:jsGlobal:2",
			kind: "jsGlobal",
			property: "convertData",
			confidence: 33,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "convert:jsGlobal:3",
			kind: "jsGlobal",
			property: "convert_temp",
			confidence: 33,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
