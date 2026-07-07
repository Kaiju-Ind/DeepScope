import type { TechnologyDefinition } from '../../types';

export const poStTechnologyDefinition = {
	id: "po-st",
	name: "Po.st",
	website: "https://www.po.st/",
	icon: "Po.st.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "po-st:jsGlobal:0",
			kind: "jsGlobal",
			property: "pwidget_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
