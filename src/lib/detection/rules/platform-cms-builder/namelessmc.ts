import type { TechnologyDefinition } from '../../types';

export const namelessmcTechnologyDefinition = {
	id: "namelessmc",
	name: "NamelessMC",
	website: "https://namelessmc.com",
	description: "NamelessMC is an open-source website software geared towards gaming communities, offering features such as forums and user profiles for managing online presence.",
	icon: "NamelessMC.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "namelessmc:dom:0",
			kind: "dom",
			selector: "span.item > a[href*='//namelessmc.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:namelessmc:nameless:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
