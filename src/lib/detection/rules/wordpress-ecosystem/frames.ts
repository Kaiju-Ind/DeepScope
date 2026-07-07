import type { TechnologyDefinition } from '../../types';

export const framesTechnologyDefinition = {
	id: "frames",
	name: "Frames",
	website: "https://getframes.io",
	description: "Frames is a tool that allows you to create wireframes in real time, design and develop systems, and access a library of components to help you build custom websites quickly and easily, without any restrictions on your creative input.",
	icon: "Frames.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "frames:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/frames-plugin/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
