import type { TechnologyDefinition } from '../../types';

export const javaServletTechnologyDefinition = {
	id: "java-servlet",
	name: "Java Servlet",
	website: "https://www.oracle.com/technetwork/java/index-jsp-135475.html",
	icon: "Java.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "java-servlet:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Servlet(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "java-servlet:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("servlet(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
