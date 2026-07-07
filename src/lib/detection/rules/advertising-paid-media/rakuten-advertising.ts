import type { TechnologyDefinition } from '../../types';

export const rakutenAdvertisingTechnologyDefinition = {
	id: "rakuten-advertising",
	name: "Rakuten Advertising",
	website: "https://rakutenadvertising.com/",
	icon: "Rakuten Advertising.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rakuten-advertising:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.rmp\\.rakuten\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
