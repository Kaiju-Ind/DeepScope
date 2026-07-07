import type { TechnologyDefinition } from '../../types';

export const pythonanywhereTechnologyDefinition = {
	id: "pythonanywhere",
	name: "PythonAnywhere",
	website: "https://www.pythonanywhere.com",
	description: "PythonAnywhere is an online integrated development environment (IDE) and web hosting service (Platform as a service) based on the Python programming language.",
	icon: "PythonAnywhere.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pythonanywhere:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^PythonAnywhere$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pythonanywhere:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^pythonanywhere$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: false,
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
