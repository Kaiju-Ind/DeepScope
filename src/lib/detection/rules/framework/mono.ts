import type { TechnologyDefinition } from '../../types';

export const monoTechnologyDefinition = {
	id: "mono",
	name: "Mono",
	website: "https://mono-project.com",
	description: "Mono is an open-source platform that enables developers to create and run .NET applications across different operating systems, facilitating cross-platform compatibility.",
	icon: "Mono.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "mono:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Mono", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mono:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mono", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mono:mono:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
