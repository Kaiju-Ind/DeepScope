import type { TechnologyDefinition } from '../../types';

export const reactBricksTechnologyDefinition = {
	id: "react-bricks",
	name: "React Bricks",
	website: "https://reactbricks.com",
	description: "React Bricks is a visual editing CMS based on React components.",
	icon: "React Bricks.svg",
	categories: [
		"ui-library",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "react-bricks:dom:0",
			kind: "dom",
			selector: "img[src*='react']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"react",
	],
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;
