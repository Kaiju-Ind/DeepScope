import type { TechnologyDefinition } from '../../types';

export const uvicornTechnologyDefinition = {
	id: "uvicorn",
	name: "Uvicorn",
	website: "https://www.uvicorn.org/",
	description: "Uvicorn is an ASGI server implementation for Python web applications, commonly used with frameworks like FastAPI to enable asynchronous and high-performance handling of web requests.",
	icon: "uvicorn.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "uvicorn:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("uvicorn", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "uvicorn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("uvicorn", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:encode:uvicorn:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
