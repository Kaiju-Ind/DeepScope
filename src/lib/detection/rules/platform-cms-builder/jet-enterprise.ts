import type { TechnologyDefinition } from '../../types';

export const jetEnterpriseTechnologyDefinition = {
	id: "jet-enterprise",
	name: "JET Enterprise",
	website: "https://www.jetecommerce.com.br/",
	icon: "JET Enterprise.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jet-enterprise:header:0",
			kind: "header",
			key: "powered",
			valuePattern: new RegExp("jet-enterprise", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
