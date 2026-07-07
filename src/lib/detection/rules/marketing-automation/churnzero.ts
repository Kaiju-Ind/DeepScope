import type { TechnologyDefinition } from '../../types';

export const churnzeroTechnologyDefinition = {
	id: "churnzero",
	name: "ChurnZero",
	website: "https://churnzero.net",
	description: "ChurnZero is a real-time customer success platform that helps subscription businesses fight customer churn.",
	icon: "ChurnZero.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "churnzero:jsGlobal:0",
			kind: "jsGlobal",
			property: "ChurnZero",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "churnzero:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChurnZero.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
