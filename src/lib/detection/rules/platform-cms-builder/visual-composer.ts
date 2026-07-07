import type { TechnologyDefinition } from '../../types';

export const visualComposerTechnologyDefinition = {
	id: "visual-composer",
	name: "Visual Composer",
	website: "https://visualcomposer.com",
	description: "Visual Composer is an all-in-one web design tool for anyone who uses WordPress.",
	icon: "visualcomposer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "visual-composer:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Powered by Visual Composer Website Builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "visual-composer:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("powered by visual composer website builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"php",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
