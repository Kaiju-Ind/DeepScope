import type { TechnologyDefinition } from '../../types';

export const textalkTechnologyDefinition = {
	id: "textalk",
	name: "Textalk",
	website: "https://www.textalk.se/webshop",
	description: "Textalk is an ecommerce platform primarily serving the Swedish market.",
	icon: "Textalk.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "textalk:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("stage\\.textalk\\.se"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
