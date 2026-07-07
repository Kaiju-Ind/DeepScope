import type { TechnologyDefinition } from '../../types';

export const atlassianJiraIssueCollectorTechnologyDefinition = {
	id: "atlassian-jira-issue-collector",
	name: "Atlassian Jira Issue Collector",
	website: "https://www.atlassian.com/software/jira/overview/",
	description: "Atlassian Jira Issue Collector is a tool used to download a list of websites using with email addresses, phone numbers and LinkedIn profiles.",
	icon: "Atlassian Jira.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "atlassian-jira-issue-collector:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jira-issue-collector-plugin"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "atlassian-jira-issue-collector:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("atlassian\\.jira\\.collector\\.plugin"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
