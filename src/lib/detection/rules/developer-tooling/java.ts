import type { TechnologyDefinition } from '../../types';

export const javaTechnologyDefinition = {
	id: "java",
	name: "Java",
	website: "https://java.com",
	description: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
	icon: "Java.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "java:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^JSESSIONID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "java:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^jsessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oracle:jre:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
