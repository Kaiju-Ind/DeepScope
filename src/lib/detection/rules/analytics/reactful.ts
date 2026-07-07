import type { TechnologyDefinition } from '../../types';

export const reactfulTechnologyDefinition = {
	id: "reactful",
	name: "Reactful",
	website: "https://app.reactful.com",
	description: "Reactful is a platform that responds to visitor intent in real time to enhance engagement and optimize website interactions.",
	icon: "Reactful.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "reactful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("visitor\\.reactful\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
