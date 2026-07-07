import type { TechnologyDefinition } from '../../types';

export const atlassianBitbucketTechnologyDefinition = {
	id: "atlassian-bitbucket",
	name: "Atlassian Bitbucket",
	website: "https://www.atlassian.com/software/bitbucket/overview/",
	description: "Bitbucket is a web-based version control repository hosting service for source code and development projects that use either Mercurial or Git revision control systems.",
	icon: "Atlassian Bitbucket.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "atlassian-bitbucket:html:0",
			kind: "html",
			pattern: new RegExp("<li>Atlassian Bitbucket <span title=\"[a-z0-9]+\" id=\"product-version\" data-commitid=\"[a-z0-9]+\" data-system-build-number=\"[a-z0-9]+\"> v([\\d.]+)<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "atlassian-bitbucket:jsGlobal:1",
			kind: "jsGlobal",
			property: "bitbucket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "atlassian-bitbucket:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("Bitbucket", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "atlassian-bitbucket:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("com\\.atlassian\\.bitbucket"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "atlassian-bitbucket:html:4",
			kind: "html",
			pattern: new RegExp("<li>atlassian bitbucket <span title=\"[a-z0-9]+\" id=\"product-version\" data-commitid=\"[a-z0-9]+\" data-system-build-number=\"[a-z0-9]+\"> v([\\d.]+)<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "atlassian-bitbucket:meta:5",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("bitbucket", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:atlassian:bitbucket:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
