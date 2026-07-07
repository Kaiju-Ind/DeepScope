import type { TechnologyDefinition } from '../../types';

export const ktorTechnologyDefinition = {
	id: "ktor",
	name: "Ktor",
	website: "https://ktor.io",
	description: "Ktor is a Kotlin framework that allow developers to write asynchronous clients and servers applications, in Kotlin.",
	icon: "Ktor.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "ktor:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Ktor\\/debug$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ktor:header:1",
			kind: "header",
			key: "x-engine",
			valuePattern: new RegExp("^Ktor$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ktor:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ktor\\/debug$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ktor:header:3",
			kind: "header",
			key: "x-engine",
			valuePattern: new RegExp("^ktor$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:jetbrains:ktor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"kotlin",
	],
} as const satisfies TechnologyDefinition;
