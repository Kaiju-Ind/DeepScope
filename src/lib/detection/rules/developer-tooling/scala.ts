import type { TechnologyDefinition } from '../../types';

export const scalaTechnologyDefinition = {
	id: "scala",
	name: "Scala",
	website: "https://www.scala-lang.org",
	description: "Scala is a general-purpose programming language providing support for both object-oriented programming and functional programming.",
	icon: "Scala.png",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:scala-lang:scala:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
