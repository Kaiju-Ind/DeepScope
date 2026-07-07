import type { TechnologyDefinition } from '../../types';

export const openswooleTechnologyDefinition = {
	id: "openswoole",
	name: "OpenSwoole",
	website: "https://openswoole.com",
	description: "OpenSwoole is a high-performance, asynchronous, event-driven, coroutine-based PHP framework.",
	icon: "OpenSwoole.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "openswoole:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("OpenSwoole(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "openswoole:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("openswoole(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
