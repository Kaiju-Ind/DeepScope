import type { TechnologyDefinition } from '../../types';

export const instamojoTechnologyDefinition = {
	id: "instamojo",
	name: "Instamojo",
	website: "https://www.instamojo.com/",
	description: "Instamojo is a Bangalore-based company that provides a platform for selling digital goods and collecting payment online.",
	icon: "instamojo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "instamojo:jsGlobal:0",
			kind: "jsGlobal",
			property: "INITIAL_STATE.seller.avatar",
			valuePattern: new RegExp("\\.instamojo\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "instamojo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Instamojo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
