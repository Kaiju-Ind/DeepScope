import type { TechnologyDefinition } from '../../types';

export const boolTypescriptTechnologyDefinition = {
	id: "bool-typescript",
	name: "Bool TypeScript",
	website: "https://boolts.dev",
	description: "Bool TypeScript is a framework optimized for high performance, leveraging Bun.sh to accelerate JavaScript and TypeScript application development.",
	icon: "BoolTypeScript.svg",
	categories: [
		"bundler",
		"transpiler",
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "bool-typescript:responseHeader:0",
			kind: "responseHeader",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Bool Typescript$"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
	},
} as const satisfies TechnologyDefinition;
