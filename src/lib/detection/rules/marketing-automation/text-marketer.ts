import type { TechnologyDefinition } from '../../types';

export const textMarketerTechnologyDefinition = {
	id: "text-marketer",
	name: "Text Marketer",
	website: "https://atomiks.github.io/tippyjs",
	description: "Text Marketer is a business messaging SMS software that enables companies to send and manage text communications.",
	icon: "TextMarketer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "text-marketer:dom:0",
			kind: "dom",
			selector: "form[action*='www.textmarketer.biz']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
