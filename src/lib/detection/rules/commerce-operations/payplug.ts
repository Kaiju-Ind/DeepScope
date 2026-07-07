import type { TechnologyDefinition } from '../../types';

export const payplugTechnologyDefinition = {
	id: "payplug",
	name: "Payplug",
	website: "https://www.payplug.com",
	description: "Payplug is a French omnichannel payment solution dedicated to merchants.",
	icon: "Payplug.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payplug:jsGlobal:0",
			kind: "jsGlobal",
			property: "PAYPLUG_DOMAIN",
			valuePattern: new RegExp("\\.payplug\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "payplug:jsGlobal:1",
			kind: "jsGlobal",
			property: "payplug.card",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "payplug:jsGlobal:2",
			kind: "jsGlobal",
			property: "payplug_ajax_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
