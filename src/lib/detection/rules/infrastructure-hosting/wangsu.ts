import type { TechnologyDefinition } from '../../types';

export const wangsuTechnologyDefinition = {
	id: "wangsu",
	name: "Wangsu",
	website: "https://en.wangsu.com",
	description: "Wangsu is a China-based company that provides content delivery network and internet data center services.",
	icon: "Wangsu.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "wangsu:jsGlobal:0",
			kind: "jsGlobal",
			property: "__cdnRoute",
			valuePattern: new RegExp("^wangsu$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wangsu:jsGlobal:1",
			kind: "jsGlobal",
			property: "playurl.wangsu",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
