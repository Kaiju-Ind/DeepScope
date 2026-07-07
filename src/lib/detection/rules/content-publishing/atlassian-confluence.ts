import type { TechnologyDefinition } from '../../types';

export const atlassianConfluenceTechnologyDefinition = {
	id: "atlassian-confluence",
	name: "Atlassian Confluence",
	website: "https://www.atlassian.com/software/confluence/overview/team-collaboration-software",
	description: "Confluence is Atlassian's team workspace and wiki for documentation and collaboration.",
	icon: "Atlassian Confluence.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "atlassian-confluence:dom:0",
			kind: "dom",
			selector: "li.print-only",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "atlassian-confluence:text:1",
			kind: "text",
			pattern: new RegExp("Atlassian Confluence ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:atlassian:confluence:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
