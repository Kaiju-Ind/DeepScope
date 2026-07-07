import type { TechnologyDefinition } from '../../types';

export const tengineTechnologyDefinition = {
	id: "tengine",
	name: "Tengine",
	website: "https://tengine.taobao.org",
	description: "Tengine is a web server which is based on the Nginx HTTP server.",
	icon: "Tengine.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "tengine:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Tengine", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "tengine:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("tengine", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
