import type { TechnologyDefinition } from '../../types';

export const govediaTechnologyDefinition = {
	id: "govedia",
	name: "GoVedia",
	website: "https://govedia.com",
	description: "GoVedia is a provider of custom ecommerce development solutions tailored to specific business needs.",
	icon: "GoVedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "govedia:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.govedia\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
