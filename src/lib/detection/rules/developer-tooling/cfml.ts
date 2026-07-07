import type { TechnologyDefinition } from '../../types';

export const cfmlTechnologyDefinition = {
	id: "cfml",
	name: "CFML",
	website: "https://adobe.com/products/coldfusion-family.html",
	description: "ColdFusion Markup Language (CFML), is a scripting language for web development that runs on the JVM, the .NET framework, and Google App Engine.",
	icon: "CFML.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "cfml:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^CFID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
