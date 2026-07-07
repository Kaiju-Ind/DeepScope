import type { TechnologyDefinition } from '../../types';

export const satSTechnologyDefinition = {
	id: "sat-s",
	name: "Satūs",
	website: "https://github.com/darkroomengineering/satus",
	description: "Satūs is a React-based starter built with Next.js, Tailwind, and advanced WebGL features, designed as a high-performance foundation for developing new web projects.",
	icon: "Satus.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "sat-s:jsGlobal:0",
			kind: "jsGlobal",
			property: "satusVersion",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
