import type { TechnologyDefinition } from '../../types';

export const klaviyoDataPlatformTechnologyDefinition = {
	id: "klaviyo-data-platform",
	name: "Klaviyo Data Platform",
	website: "https://www.klaviyo.com/solutions/customer-data-platform",
	description: "Klaviyo Data Platform is Klaviyo's CDP offering.",
	icon: "Klaviyo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "klaviyo-data-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static-tracking\\.klaviyo\\.com\\/onsite\\/js\\/web_personalization"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
