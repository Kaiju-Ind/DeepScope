import type { TechnologyDefinition } from '../../types';

export const litespeedTechnologyDefinition = {
	id: "litespeed",
	name: "LiteSpeed",
	website: "https://litespeedtech.com",
	description: "LiteSpeed is a high-scalability web server.",
	icon: "LiteSpeed.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "litespeed:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^LiteSpeed$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "litespeed:header:1",
			kind: "header",
			key: "X-Turbo-Charged-By",
			valuePattern: new RegExp("^LiteSpeed$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "litespeed:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^litespeed$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:litespeedtech:litespeed_web_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
