import type { TechnologyDefinition } from '../../types';

export const jenkinsTechnologyDefinition = {
	id: "jenkins",
	name: "Jenkins",
	website: "https://jenkins.io/",
	description: "Jenkins is an open-source automation tool written in Java with plugins built for Continuous Integration (CI) purposes.",
	icon: "Jenkins.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "jenkins:html:0",
			kind: "html",
			pattern: new RegExp("<span class=\"jenkins_ver\"><a href=\"https:\\/\\/jenkins\\.io\\/\">Jenkins ver\\. ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jenkins:jsGlobal:1",
			kind: "jsGlobal",
			property: "jenkinsCIGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jenkins:jsGlobal:2",
			kind: "jsGlobal",
			property: "jenkinsRules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jenkins:header:3",
			kind: "header",
			key: "X-Jenkins",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jenkins:dom:4",
			kind: "dom",
			selector: "span.jenkins_ver > a[href='https://jenkins.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jenkins:html:5",
			kind: "html",
			pattern: new RegExp("<span class=\"jenkins_ver\"><a href=\"https:\\/\\/jenkins\\.io\\/\">jenkins ver\\. ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jenkins:header:6",
			kind: "header",
			key: "x-jenkins",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jenkins:jenkins:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
