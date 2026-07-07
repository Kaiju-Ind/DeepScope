import type { TechnologyDefinition } from '../../types';

export const lexerTechnologyDefinition = {
	id: "lexer",
	name: "Lexer",
	website: "https://www.lexer.io",
	description: "Lexer is a platform providing AI-powered tools for managing customer data and automating business workflows.",
	icon: "Lexer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lexer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.lexer\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lexer:jsGlobal:1",
			kind: "jsGlobal",
			property: "___lexer_tag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
