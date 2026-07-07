import type { TechnologyDefinition } from '../../types';

export const gitlabCiCdTechnologyDefinition = {
	id: "gitlab-ci-cd",
	name: "GitLab CI/CD",
	website: "https://about.gitlab.com/gitlab-ci",
	description: "GitLab CI/CD is GitLab's built-in continuous integration and delivery system.",
	icon: "GitLab CI.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitlab-ci-cd:meta:0",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("GitLab CI\\/CD is a tool built into GitLab for software development through continuous methodologies.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gitlab-ci-cd:meta:1",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("gitlab ci\\/cd is a tool built into gitlab for software development through continuous methodologies.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
