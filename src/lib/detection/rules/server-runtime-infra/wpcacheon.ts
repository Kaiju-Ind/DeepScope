import type { TechnologyDefinition } from '../../types';

export const wpcacheonTechnologyDefinition = {
	id: "wpcacheon",
	name: "WPCacheOn",
	website: "https://wpcacheon.io",
	description: "WPCacheOn is a caching and performance optimisation plugin, which improves the loading speed of WordPress websites.",
	icon: "WPCacheOn.png",
	categories: [
		"server-runtime-infra",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wpcacheon:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Optimized by WPCacheOn", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wpcacheon:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^optimized by wpcacheon", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
