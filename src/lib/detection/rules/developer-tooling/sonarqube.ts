import type { TechnologyDefinition } from '../../types';

export const sonarqubeTechnologyDefinition = {
	id: "sonarqube",
	name: "SonarQube",
	website: "https://www.sonarqube.org/",
	description: "SonarQube is an open-source platform for the continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities on 20+ programming languages.",
	icon: "SonarQube.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "sonarqube:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/js\\/bundles\\/sonar\\.js?v=([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sonarqube:html:1",
			kind: "html",
			pattern: new RegExp("<link href=\"\\/css\\/sonar\\.css\\?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqube:html:2",
			kind: "html",
			pattern: new RegExp("<title>SonarQube<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqube:jsGlobal:3",
			kind: "jsGlobal",
			property: "SonarMeasures",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonarqube:jsGlobal:4",
			kind: "jsGlobal",
			property: "SonarRequest",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonarqube:meta:5",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^SonarQube$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sonarqube:html:6",
			kind: "html",
			pattern: new RegExp("<title>sonarqube<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sonarqube:meta:7",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^sonarqube$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
