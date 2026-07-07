import type { TechnologyDefinition } from '../../types';

export const makeswiftTechnologyDefinition = {
	id: "makeswift",
	name: "Makeswift",
	website: "https://www.makeswift.com",
	description: "Makeswift is a no-code website builder with the power and detail of a design tool.",
	icon: "Makeswift.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "makeswift:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.makeswift\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "makeswift:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("app\\.makeswift\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "makeswift:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("app\\.makeswift\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "makeswift:header:3",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("app\\.makeswift\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "makeswift:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("app\\.makeswift\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
