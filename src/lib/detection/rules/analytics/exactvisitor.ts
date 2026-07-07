import type { TechnologyDefinition } from '../../types';

export const exactvisitorTechnologyDefinition = {
	id: "exactvisitor",
	name: "ExactVisitor",
	website: "https://exactvisitor.com",
	description: "ExactVisitor is a tool that identifies and provides insights about individuals visiting a website.",
	icon: "ExactVisitor.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "exactvisitor:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("track\\.exactvisitor\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
