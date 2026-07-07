import type { TechnologyDefinition } from '../../types';

export const gekosaleTechnologyDefinition = {
	id: "gekosale",
	name: "Gekosale",
	website: "https://gekosale.pl",
	description: "Gekosale is an open-source ecommerce solution designed for building and managing online stores.",
	icon: "Gekosale.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gekosale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\bgekosale(?:\\.libs)?(?:\\.min)?\\.js\\b"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
