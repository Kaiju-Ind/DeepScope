import type { TechnologyDefinition } from '../../types';

export const iconscoutTechnologyDefinition = {
	id: "iconscout",
	name: "IconScout",
	website: "https://iconscout.com",
	description: "IconScout is a platform that offers a diverse collection of high-quality icons and design resources for creative professionals, allowing them to enhance their projects with visually appealing elements.",
	icon: "IconScout.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "iconscout:dom:0",
			kind: "dom",
			selector: "link[href*='.iconscout.com/'], img[src*='.iconscout.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
