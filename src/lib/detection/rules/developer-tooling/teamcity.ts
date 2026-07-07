import type { TechnologyDefinition } from '../../types';

export const teamcityTechnologyDefinition = {
	id: "teamcity",
	name: "TeamCity",
	website: "https://www.jetbrains.com/teamcity/",
	description: "TeamCity is a build management and continuous integration server from JetBrains.",
	icon: "TeamCity.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "teamcity:html:0",
			kind: "html",
			pattern: new RegExp("<span class=\"versionTag\"><span class=\"vWord\">Version<\\/span> ([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "teamcity:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("TeamCity", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "teamcity:dom:2",
			kind: "dom",
			selector: "span[class*='versionTag'], span[class*='vWord']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "teamcity:html:3",
			kind: "html",
			pattern: new RegExp("<span class=\"versiontag\"><span class=\"vword\">version<\\/span> ([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "teamcity:meta:4",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("teamcity", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "teamcity:dom:5",
			kind: "dom",
			selector: "span[class*='vWord']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jetbrains:teamcity:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-tomcat",
		"java",
		"jquery",
		"moment-js",
		"prototype",
		"react",
		"underscore-js",
	],
} as const satisfies TechnologyDefinition;
