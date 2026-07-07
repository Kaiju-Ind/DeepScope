import type { TechnologyDefinition } from '../../types';

export const cratejoyTechnologyDefinition = {
	id: "cratejoy",
	name: "Cratejoy",
	website: "https://www.cratejoy.com",
	description: "Cratejoy is a brand new ecommerce platform with a focus on subscription payments.",
	icon: "Cratejoy.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cratejoy:jsGlobal:0",
			kind: "jsGlobal",
			property: "statjoyServer",
			valuePattern: new RegExp("stats\\.cratejoy\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cratejoy:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^cratejoy_muffin42$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cratejoy:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^statjoy_metrics$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
