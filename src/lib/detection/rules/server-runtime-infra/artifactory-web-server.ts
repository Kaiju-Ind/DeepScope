import type { TechnologyDefinition } from '../../types';

export const artifactoryWebServerTechnologyDefinition = {
	id: "artifactory-web-server",
	name: "Artifactory Web Server",
	website: "https://jfrog.com/open-source/#os-arti",
	icon: "Artifactory.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "artifactory-web-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Artifactory(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "artifactory-web-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("artifactory(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:jfrog:artifactory:*:*:*:*:*:*:*:*",
	},
	implies: [
		"artifactory",
	],
} as const satisfies TechnologyDefinition;
