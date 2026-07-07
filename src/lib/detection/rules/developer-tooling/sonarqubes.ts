import type { TechnologyDefinition } from '../../types';

export const sonarqubesTechnologyDefinition = {
	id: "sonarqubes",
	name: "SonarQubes",
	website: "https://www.sonarqube.org/",
	description: "SonarQube is an open-source platform for the continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.",
	icon: "sonar.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "sonarqubes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/js\\/bundles\\/sonar\\.js?v=([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sonarqubes:html:1",
			kind: "html",
			pattern: new RegExp("<link href=\"\\/css\\/sonar\\.css\\?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqubes:html:2",
			kind: "html",
			pattern: new RegExp("<title>SonarQube<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqubes:jsGlobal:3",
			kind: "jsGlobal",
			property: "SonarMeasures",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonarqubes:jsGlobal:4",
			kind: "jsGlobal",
			property: "SonarRequest",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonarqubes:meta:5",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^SonarQubes$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sonarqubes:dom:6",
			kind: "dom",
			selector: "link[href*='/css/sonar.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sonarqubes:html:7",
			kind: "html",
			pattern: new RegExp("<title>sonarqube<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqubes:meta:8",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^sonarqubes$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
