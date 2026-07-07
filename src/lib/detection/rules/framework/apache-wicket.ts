import type { TechnologyDefinition } from '../../types';

export const apacheWicketTechnologyDefinition = {
	id: "apache-wicket",
	name: "Apache Wicket",
	website: "https://wicket.apache.org",
	description: "Apache Wicket is an open-source Java web application framework for building scalable and maintainable web applications.",
	icon: "Apache Wicket.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "apache-wicket:jsGlobal:0",
			kind: "jsGlobal",
			property: "Wicket",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:wicket:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
