import type { TechnologyDefinition } from '../../types';

export const denoDeployTechnologyDefinition = {
	id: "deno-deploy",
	name: "Deno Deploy",
	website: "https://deno.land/",
	description: "Deno Deploy is a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide.",
	icon: "deno.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "deno-deploy:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^deno\\/*", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
	implies: [
		"deno",
	],
} as const satisfies TechnologyDefinition;
