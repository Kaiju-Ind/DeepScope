import type { TechnologyDefinition } from '../../types';

export const thoughtIndustriesTechnologyDefinition = {
	id: "thought-industries",
	name: "Thought Industries",
	website: "https://www.thoughtindustries.com",
	description: "Thought Industries is an enterprise learning platform designed for customer, partner, and professional training, offering a structured learning experiences system.",
	icon: "ThoughtIndustries.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "thought-industries:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("thoughtindustries\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
