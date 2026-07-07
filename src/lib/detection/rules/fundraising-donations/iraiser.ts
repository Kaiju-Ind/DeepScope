import type { TechnologyDefinition } from '../../types';

export const iraiserTechnologyDefinition = {
	id: "iraiser",
	name: "iRaiser",
	website: "https://www.iraiser.com",
	description: "iRaiser is a platform that provides charities with tailored solutions to optimize and manage fundraising activities.",
	icon: "iRaiser.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "iraiser:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.iraiser\\.eu"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "iraiser:jsGlobal:1",
			kind: "jsGlobal",
			property: "iRaiser.PaymentStartDate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iraiser:jsGlobal:2",
			kind: "jsGlobal",
			property: "iraiser_counter",
			description: "Page-owned global matches a known technology marker.",
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
