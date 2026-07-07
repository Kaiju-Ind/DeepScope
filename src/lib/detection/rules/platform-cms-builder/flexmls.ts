import type { TechnologyDefinition } from '../../types';

export const flexmlsTechnologyDefinition = {
	id: "flexmls",
	name: "Flexmls",
	website: "https://flexmls.com",
	description: "Ecomtrack is a multi-listing CMS system designed for the real estate market, enabling property management and listings.",
	icon: "Flexmls.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flexmls:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/plugins\\/flexmls-idx\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flexmls:jsGlobal:1",
			kind: "jsGlobal",
			property: "flexmls_connect",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
