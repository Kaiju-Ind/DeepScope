import type { TechnologyDefinition } from '../../types';

export const websocketTechnologyDefinition = {
	id: "websocket",
	name: "WebSocket",
	website: "https://en.wikipedia.org/wiki/WebSocket",
	description: "WebSocket is a communication protocol that provides full-duplex communication channels over a single, long-lived connection, enabling interactive communication between web browsers and servers.",
	icon: "websocket.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "websocket:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+rel=[\"']web-socket[\"']"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "websocket:html:1",
			kind: "html",
			pattern: new RegExp("<(?:link|a)[^>]+href=[\"']wss?:\\/\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "websocket:dom:2",
			kind: "dom",
			selector: "link[rel='web-socket']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "websocket:dom:3",
			kind: "dom",
			selector: "link[href^='ws://']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "websocket:dom:4",
			kind: "dom",
			selector: "link[href^='wss://']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "websocket:header:5",
			kind: "header",
			key: "Upgrade",
			valuePattern: new RegExp("websocket", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "websocket:header:6",
			kind: "header",
			key: "upgrade",
			valuePattern: new RegExp("websocket", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "websocket:dom:7",
			kind: "dom",
			selector: "link[rel='web-socket'], link[href^='ws://'],link[href^='wss://']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
