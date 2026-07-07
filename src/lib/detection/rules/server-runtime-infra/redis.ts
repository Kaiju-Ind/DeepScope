import type { TechnologyDefinition } from '../../types';

export const redisTechnologyDefinition = {
	id: "redis",
	name: "Redis",
	website: "https://redis.io",
	description: "Redis is an in-memory data structure project implementing a distributed, in-memory key–value database with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indexes.",
	icon: "Redis.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:redislabs:redis:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
