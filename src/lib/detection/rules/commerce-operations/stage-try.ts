import type { TechnologyDefinition } from '../../types';

export const stageTryTechnologyDefinition = {
	id: "stage-try",
	name: "Stage Try",
	website: "https://stagetry.com",
	description: "Stage Try is an end-to-end ecommerce platform amplifying AOV and conversions of online stores.",
	icon: "Stage Try.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "stage-try:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stagetry\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stage-try:jsGlobal:1",
			kind: "jsGlobal",
			property: "stage_cart_change_events",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stage-try:jsGlobal:2",
			kind: "jsGlobal",
			property: "stage_cart_total_price",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
