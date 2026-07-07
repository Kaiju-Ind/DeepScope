import type { TechnologyDefinition } from '../../types';

export const draprTechnologyDefinition = {
	id: "drapr",
	name: "Drapr",
	website: "https://www.drapr.com",
	description: "Drapr is an ecommerce startup and online application based on technology that enables customers to quickly create 3D avatars and virtually try on clothing.",
	icon: "Drapr.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "drapr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("draprpubsubtest\\.firebaseapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drapr:jsGlobal:1",
			kind: "jsGlobal",
			property: "drapr_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drapr:jsGlobal:2",
			kind: "jsGlobal",
			property: "drapr_deferLoading",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
