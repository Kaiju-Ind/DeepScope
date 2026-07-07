import type { TechnologyDefinition } from '../../types';

export const neoOmnichannelCommercePlatformTechnologyDefinition = {
	id: "neo-omnichannel-commerce-platform",
	name: "NEO - Omnichannel Commerce Platform",
	website: "https://www.jetecommerce.com.br",
	description: "NEO is an ecommerce software that manages multiple online stores.",
	icon: "Plataforma NEO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "neo-omnichannel-commerce-platform:url:0",
			kind: "url",
			pattern: new RegExp("\\.plataformaneo\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "neo-omnichannel-commerce-platform:dom:1",
			kind: "dom",
			selector: "#svr[value^=\"NEOWEBV\"]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "neo-omnichannel-commerce-platform:header:2",
			kind: "header",
			key: "powered",
			valuePattern: new RegExp("jet-neo", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
