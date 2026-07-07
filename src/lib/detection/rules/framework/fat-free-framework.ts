import type { TechnologyDefinition } from '../../types';

export const fatFreeFrameworkTechnologyDefinition = {
	id: "fat-free-framework",
	name: "Fat-Free Framework",
	website: "https://fatfreeframework.com",
	description: "Fat-Free Framework (F3) is a lightweight PHP micro-framework that enables rapid development of dynamic web applications with built-in features like URL routing, caching, multilingual support, and database integration for high performance.",
	icon: "Fat-Free Framework.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "fat-free-framework:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Fat-Free Framework$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fat-free-framework:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^fat-free framework$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:fatfreeframework:fat-free_framework:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
