import type { TechnologyDefinition } from '../../types';

export const pojoMeTechnologyDefinition = {
	id: "pojo-me",
	name: "Pojo.me",
	website: "https://pojo.me/plugins/accessibility/",
	description: "Pojo.me provides an Accessibility overlay plug-in for any WordPress Theme or Page Builder.",
	icon: "Pojo.me.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "pojo-me:jsGlobal:0",
			kind: "jsGlobal",
			property: "PojoA11yOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
