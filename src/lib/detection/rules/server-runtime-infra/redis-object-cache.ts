import type { TechnologyDefinition } from '../../types';

export const redisObjectCacheTechnologyDefinition = {
	id: "redis-object-cache",
	name: "Redis Object Cache",
	website: "https://wprediscache.com",
	icon: "RedisObjectCache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "redis-object-cache:html:0",
			kind: "html",
			pattern: new RegExp("<!--\\s+Performance optimized by Redis Object Cache"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "redis-object-cache:html:1",
			kind: "html",
			pattern: new RegExp("<!--\\s+performance optimized by redis object cache"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"redis",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
