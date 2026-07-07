import type { TechnologyDefinition } from '../../types';

export const mongrelTechnologyDefinition = {
	id: "mongrel",
	name: "Mongrel",
	website: "https://mongrel2.org",
	icon: "Mongrel.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mongrel:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Mongrel", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mongrel:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mongrel", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:zed_shaw:mongrel:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
