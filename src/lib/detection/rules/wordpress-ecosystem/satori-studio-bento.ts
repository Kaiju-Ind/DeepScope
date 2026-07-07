import type { TechnologyDefinition } from '../../types';

export const satoriStudioBentoTechnologyDefinition = {
	id: "satori-studio-bento",
	name: "Satori Studio Bento",
	website: "https://satoristudio.net/bento-free-wordpress-theme",
	description: "Satori Studio Bento is a powerful yet user-friendly free WordPress theme intended for use in the broadest range of web projects.",
	icon: "Satori Studio.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "satori-studio-bento:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bento\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
