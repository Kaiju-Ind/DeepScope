import type { TechnologyDefinition } from '../../types';

export const mentadTechnologyDefinition = {
	id: "mentad",
	name: "Mentad",
	website: "https://www.mentad.com",
	description: "Mentad is a predictive marketing platform to acquire new customers.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mentad:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("mentad_website_id"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mentad:jsGlobal:1",
			kind: "jsGlobal",
			property: "mentad_website_id",
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
