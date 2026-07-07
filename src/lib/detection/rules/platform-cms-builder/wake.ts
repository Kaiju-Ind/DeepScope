import type { TechnologyDefinition } from '../../types';

export const wakeTechnologyDefinition = {
	id: "wake",
	name: "Wake",
	website: "https://wake.tech/",
	description: "Wake is an ecommerce software with integrated digital solutions to manage online stores.",
	icon: "wakecommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wake:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("wake", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wake:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Wake", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
