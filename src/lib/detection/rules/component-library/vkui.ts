import type { TechnologyDefinition } from '../../types';

export const vkuiTechnologyDefinition = {
	id: "vkui",
	name: "VKUI",
	website: "https://vkcom.github.io/VKUI",
	description: "VKUI is a set of React components with which you can create interfaces that are visually indistinguishable from our iOS and Android applications.",
	icon: "vk.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "vkui:dom:0",
			kind: "dom",
			selector: "html.vkui",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
