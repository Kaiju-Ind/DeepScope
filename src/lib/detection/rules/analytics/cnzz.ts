import type { TechnologyDefinition } from '../../types';

export const cnzzTechnologyDefinition = {
	id: "cnzz",
	name: "CNZZ",
	website: "https://web.umeng.com/",
	description: "CNZZ is a web analytics service provided by Umeng.",
	icon: "cnzz.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "cnzz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/[^./]+\\.cnzz\\.com\\/(?:z_stat.php|core)\\?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cnzz:jsGlobal:1",
			kind: "jsGlobal",
			property: "cnzz_protocol",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
