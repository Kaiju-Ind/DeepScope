import type { TechnologyDefinition } from '../../types';

export const payhipTechnologyDefinition = {
	id: "payhip",
	name: "Payhip",
	website: "https://payhip.com",
	description: "Payhip is a platform that enables creators to sell digital downloads and manage membership subscriptions.",
	icon: "Payhip.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "payhip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("payhip\\.com\\/js\\/payhip\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "payhip:jsGlobal:1",
			kind: "jsGlobal",
			property: "Payhip.Alert",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "payhip:jsGlobal:2",
			kind: "jsGlobal",
			property: "PayhipSetupFinished",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
