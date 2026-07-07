import type { TechnologyDefinition } from '../../types';

export const pantheonTechnologyDefinition = {
	id: "pantheon",
	name: "Pantheon",
	website: "https://pantheon.io/",
	description: "Pantheon is a WebOps (Website Operations) and Management Platform for WordPress and Drupal.",
	icon: "Pantheon.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pantheon:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Pantheon", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pantheon:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^pantheon", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"fastly",
		"mariadb",
		"nginx",
		"php",
	],
} as const satisfies TechnologyDefinition;
