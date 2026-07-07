import type { TechnologyDefinition } from '../../types';

export const grabPayLaterTechnologyDefinition = {
	id: "grab-pay-later",
	name: "Grab Pay Later",
	website: "https://www.grab.com/sg/finance/pay-later/",
	description: "Grab Pay Later is a buy now pay later solution offered by Grab.",
	icon: "Grab.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "grab-pay-later:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("grab-paylater\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grab-pay-later:jsGlobal:1",
			kind: "jsGlobal",
			property: "GrabWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "grab-pay-later:jsGlobal:2",
			kind: "jsGlobal",
			property: "grab_widget_money_format",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
