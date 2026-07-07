import type { TechnologyDefinition } from '../../types';

export const genezioTechnologyDefinition = {
	id: "genezio",
	name: "genezio",
	website: "https://genez.io",
	description: "Genezio is a code generation tool that facilitates app logic focus, organises backend API code in deployable classes, autogenerates class interfaces with JSON-RPC for typesafe API calls, supports REST and Webhooks, enables simple API code deployment on pre-configured infrastructure using a shell command, and provides an SDK that eliminates the need to handle URLs, headers.",
	icon: "genezio.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "genezio:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^genezio$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "genezio:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^genezio$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
