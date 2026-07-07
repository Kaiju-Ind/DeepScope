import type { TechnologyDefinition } from '../../types';

export const intershopTechnologyDefinition = {
	id: "intershop",
	name: "Intershop",
	website: "https://intershop.com",
	description: "Intershop is an ecommerce platform, tailored to the needs of complex business processes and major organisations.",
	icon: "Intershop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "intershop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:is-bin|INTERSHOP)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intershop:html:1",
			kind: "html",
			pattern: new RegExp("<ish-root"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "intershop:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?:is-bin|intershop)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
