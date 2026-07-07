import type { TechnologyDefinition } from '../../types';

export const hypercornTechnologyDefinition = {
	id: "hypercorn",
	name: "Hypercorn",
	website: "https://pgjones.gitlab.io/hypercorn/",
	description: "Hypercorn is an ASGI web server that supports HTTP/1, HTTP/2, WebSockets, ASGI/2, and ASGI/3 specifications, and can utilize asyncio, uvloop, or trio for asynchronous operations.",
	icon: "hypercorn.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hypercorn:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("hypercorn", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hypercorn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("hypercorn", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
