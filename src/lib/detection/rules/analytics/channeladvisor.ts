import type { TechnologyDefinition } from '../../types';

export const channeladvisorTechnologyDefinition = {
	id: "channeladvisor",
	name: "ChannelAdvisor",
	website: "https://www.channeladvisor.com",
	description: "ChannelAdvisor is a provider of cloud-based solutions to ecommerce companies.",
	icon: "ChannelAdvisor.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "channeladvisor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.channeladvisor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "channeladvisor:dom:1",
			kind: "dom",
			selector: "link[href*='.channeladvisor.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
