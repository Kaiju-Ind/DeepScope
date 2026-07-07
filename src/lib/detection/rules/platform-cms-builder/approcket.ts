import type { TechnologyDefinition } from '../../types';

export const approcketTechnologyDefinition = {
	id: "approcket",
	name: "Approcket",
	website: "https://approcket.ir",
	description: "Approcket is a website builder platform that provides tools for creating, managing, and publishing websites and online stores through a hosted platform.",
	icon: "Approcket.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "approcket:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^AppRocket$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "approcket:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AppRocket Website Builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
