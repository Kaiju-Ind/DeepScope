import type { TechnologyDefinition } from '../../types';

export const boolTypescriptTechnologyDefinition = {
	id: "bool-typescript",
	name: "Bool TypeScript",
	website: "https://boolts.dev",
	description: "Bool TypeScript is a framework optimized for high performance, leveraging Bun.sh to accelerate JavaScript and TypeScript application development.",
	icon: "BoolTypeScript.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "bool-typescript:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Bool Typescript$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bool-typescript:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^bool typescript$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
