import type { TechnologyDefinition } from '../../types';

export const gitlabTechnologyDefinition = {
	id: "gitlab",
	name: "GitLab",
	website: "https://about.gitlab.com",
	description: "GitLab is a web-based DevOps lifecycle tool that provides a Git-repository manager providing wiki, issue-tracking and continuous integration and deployment pipeline features, using an open-source license.",
	icon: "GitLab.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitlab:html:0",
			kind: "html",
			pattern: new RegExp("<meta content=\"https?:\\/\\/[^/]+\\/assets\\/gitlab_logo-"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitlab:html:1",
			kind: "html",
			pattern: new RegExp("<header class=\"navbar navbar-fixed-top navbar-gitlab with-horizontal-nav\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitlab:jsGlobal:2",
			kind: "jsGlobal",
			property: "GitLab",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitlab:jsGlobal:3",
			kind: "jsGlobal",
			property: "gl.dashboardOptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitlab:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_gitlab_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gitlab:meta:5",
			kind: "meta",
			key: "og:site_name",
			valuePattern: new RegExp("^GitLab$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gitlab:meta:6",
			kind: "meta",
			key: "og:site_name",
			valuePattern: new RegExp("^gitlab$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gitlab:gitlab:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby-on-rails",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
