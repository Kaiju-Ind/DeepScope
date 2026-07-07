import type { TechnologyDefinition } from '../../types';

export const sockjsTechnologyDefinition = {
	id: "sockjs",
	name: "SockJS",
	website: "https://github.com/sockjs/sockjs-client",
	description: "SockJS is a browser-based JavaScript library that offers a WebSocket-like communication interface for applications.",
	icon: "SockJS.png",
	categories: [
		"widgets-misc",
		"framework",
	],
	rules: [
		{
			id: "sockjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sockjs(?:-((?:\\d+\\.)+\\d+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sockjs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?sockjs(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sockjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "SockJS.CLOSED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sockjs:jsGlobal:3",
			kind: "jsGlobal",
			property: "SockJS.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
