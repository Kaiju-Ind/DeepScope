import type { TechnologyDefinition } from '../../types';

export const augmentedUiTechnologyDefinition = {
	id: "augmented-ui",
	name: "augmented-ui",
	website: "https://augmented-ui.com",
	description: "augmented-ui is an UI framework inspired by cyberpunk and sci-fi.",
	icon: "augmented-ui.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "augmented-ui:dom:0",
			kind: "dom",
			selector: "[data-augmented-ui]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
