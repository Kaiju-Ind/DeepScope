import type { TechnologyDefinition } from '../../types';

export const endurancePageCacheTechnologyDefinition = {
	id: "endurance-page-cache",
	name: "Endurance Page Cache",
	website: "https://github.com/bluehost/endurance-page-cache",
	description: "Endurance Page Cache adds basic file-based caching to WordPress.",
	icon: "endurance-cache.png",
	categories: [
		"wordpress-ecosystem",
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
