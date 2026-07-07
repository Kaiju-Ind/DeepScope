import type { TechnologyDefinition } from '../../types';

export const funnelcockpitTechnologyDefinition = {
	id: "funnelcockpit",
	name: "FunnelCockpit",
	website: "https://funnelcockpit.com",
	description: "FunnelCockpit is an all-in-one funnel builder.",
	icon: "FunnelCockpit.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "funnelcockpit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.funnelcockpit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "funnelcockpit:dom:1",
			kind: "dom",
			selector: "a[href*='.funnelcockpit.com/'][target='_blank'], iframe[src*='.funnelcockpit.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
