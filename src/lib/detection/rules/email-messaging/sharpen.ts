import type { TechnologyDefinition } from '../../types';

export const sharpenTechnologyDefinition = {
	id: "sharpen",
	name: "Sharpen",
	website: "https://sharpencx.com",
	description: "Sharpen is a platform focused on developing AI-empowered human agents to enhance communication.",
	icon: "Sharpen.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sharpen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.sharpen\\.cx"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
