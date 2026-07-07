import type { TechnologyDefinition } from '../../types';

export const postmanApiDocumentationTechnologyDefinition = {
	id: "postman-api-documentation",
	name: "Postman API Documentation",
	website: "https://www.postman.com",
	description: "Postman is an API design and documentation platform.",
	icon: "PostmanAPIDocumentation.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "postman-api-documentation:jsGlobal:0",
			kind: "jsGlobal",
			property: "PostmanRunObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "postman-api-documentation:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Postman Documenter$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "postman-api-documentation:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^postman documenter$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
