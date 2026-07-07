import type { TechnologyDefinition } from '../../types';

export const kotlinTechnologyDefinition = {
	id: "kotlin",
	name: "Kotlin",
	website: "https://kotlinlang.org",
	description: "Kotlin is a general purpose, free, open-source, statically typed “pragmatic” programming language initially designed for the JVM (Java Virtual Machine) and Android that combines object-oriented and functional programming features.",
	icon: "Kotlin.svg",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:jetbrains:kotlin:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
