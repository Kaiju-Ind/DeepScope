import type { TechnologyDefinition } from '../../types';

export const calibermindTechnologyDefinition = {
	id: "calibermind",
	name: "CaliberMind",
	website: "https://calibermind.com",
	description: "CaliberMind is a marketing analytics platform designed for B2B marketers to optimize strategies and improve decision-making through data insights.",
	icon: "CaliberMind.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "calibermind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.calibermind\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "calibermind:jsGlobal:1",
			kind: "jsGlobal",
			property: "calibermindAddFormListener",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "calibermind:jsGlobal:2",
			kind: "jsGlobal",
			property: "calibermindCaptureSubmit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
