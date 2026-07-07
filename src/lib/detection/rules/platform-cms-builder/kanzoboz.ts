import type { TechnologyDefinition } from '../../types';

export const kanzobozTechnologyDefinition = {
	id: "kanzoboz",
	name: "KanzOboz",
	website: "https://kanzoboz.ru",
	description: "KanzOboz is a platform for online shopping and advertising, specializing in fashion and lifestyle products.",
	icon: "KanzOboz.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kanzoboz:dom:0",
			kind: "dom",
			selector: "a[href*='kanzoboz.ru/'] > img[src*='rating.kanzoboz.ru']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
