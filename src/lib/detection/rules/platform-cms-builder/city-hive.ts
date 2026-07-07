import type { TechnologyDefinition } from '../../types';

export const cityHiveTechnologyDefinition = {
	id: "city-hive",
	name: "City Hive",
	website: "https://www.cityhive.net",
	description: "City Hive's all in one ecommerce platform for wine and spirit shops.",
	icon: "City Hive.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "city-hive:jsGlobal:0",
			kind: "jsGlobal",
			property: "cityHiveSites",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "city-hive:jsGlobal:1",
			kind: "jsGlobal",
			property: "cityHiveWebsiteName",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
