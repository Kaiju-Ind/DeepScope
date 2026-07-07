import type { TechnologyDefinition } from '../../types';

export const socketIoTechnologyDefinition = {
	id: "socket-io",
	name: "Socket.io",
	website: "https://socket.io",
	icon: "Socket.io.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "socket-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("socket\\.io.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "socket-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "io.Socket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "socket-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "io.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:socket:socket.io:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
