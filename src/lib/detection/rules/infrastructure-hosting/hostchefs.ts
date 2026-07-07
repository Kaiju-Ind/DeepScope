import type { TechnologyDefinition } from '../../types';

export const hostchefsTechnologyDefinition = {
	id: "hostchefs",
	name: "HostChefs",
	website: "https://hostchefs.eu",
	description: "HostChefs is a web hosting service that provides infrastructure and tools for deploying, managing, and maintaining websites online.",
	icon: "HostChefs.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hostchefs:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^HostChefs DDoS Protected$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
