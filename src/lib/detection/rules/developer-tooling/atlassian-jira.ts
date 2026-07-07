import type { TechnologyDefinition } from '../../types';

export const atlassianJiraTechnologyDefinition = {
	id: "atlassian-jira",
	name: "Atlassian Jira",
	website: "https://www.atlassian.com/software/jira",
	description: "Jira is Atlassian's issue tracking and project management platform for software and business teams.",
	icon: "Atlassian Jira.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "atlassian-jira:dom:0",
			kind: "dom",
			selector: "#jira",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "atlassian-jira:jsGlobal:1",
			kind: "jsGlobal",
			property: "jira.id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "atlassian-jira:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("JIRA", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "atlassian-jira:meta:3",
			kind: "meta",
			key: "data-version",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "atlassian-jira:meta:4",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("jira", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:atlassian:jira:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
