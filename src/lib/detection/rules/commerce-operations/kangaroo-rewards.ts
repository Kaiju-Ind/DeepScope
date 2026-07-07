import type { TechnologyDefinition } from '../../types';

export const kangarooRewardsTechnologyDefinition = {
	id: "kangaroo-rewards",
	name: "Kangaroo Rewards",
	website: "https://loyalty.kangaroorewards.com",
	description: "Kangaroo Rewards is a platform designed to help businesses grow by fostering customer loyalty and enhancing brand recognition.",
	icon: "KangarooRewards.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "kangaroo-rewards:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.kangaroorewards\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kangaroo-rewards:jsGlobal:1",
			kind: "jsGlobal",
			property: "KangarooApps.Loyalties",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
