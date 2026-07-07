import type { TechnologyDefinition } from '../../types';

export const serverSentEventsTechnologyDefinition = {
	id: "server-sent-events",
	name: "Server-Sent Events",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events",
	description: "Server push technology enabling a client to receive automatic updates from a server",
	categories: [
		"api-pattern",
	],
	rules: [
		{
			id: "server-sent-events:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\"text\\/event-stream\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "server-sent-events:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"eventsource\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "server-sent-events:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("eventsource[.\\-@/]"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "server-sent-events:header:modern:3",
			kind: "header",
			key: "content-type",
			valuePattern: new RegExp("text\\/event-stream"),
			confidence: 55,
			description: "HTTP response header matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
