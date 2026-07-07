import type { TechnologyDefinition } from '../../types';

export const jeengTechnologyDefinition = {
	id: "jeeng",
	name: "Jeeng",
	website: "https://www.jeeng.com",
	description: "Jeeng is a personalized notification platform that delivers targeted updates based on user preferences and engagement patterns.",
	icon: "Jeeng.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "jeeng:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.jeeng\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jeeng:jsGlobal:1",
			kind: "jsGlobal",
			property: "jeeng_attribution",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
