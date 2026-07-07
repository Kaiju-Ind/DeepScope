import type { TechnologyDefinition } from '../../types';

export const sitefinityInsightTechnologyDefinition = {
	id: "sitefinity-insight",
	name: "Sitefinity Insight",
	website: "https://www.progress.com/documentation/sitefinity-cms/sitefinity-insight",
	description: "Sitefinity Insight is a tool that tracks user behavior on a site to help analyze interactions, identify patterns, and support data-driven decisions.",
	icon: "Sitefinity.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sitefinity-insight:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.insight\\.sitefinity\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
