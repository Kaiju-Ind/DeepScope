import type { TechnologyDefinition } from '../../types';

export const squareOnlineTechnologyDefinition = {
	id: "square-online",
	name: "Square Online",
	website: "https://squareup.com/us/en/online-store",
	description: "Square Online is a subscription based service that provides ecommerce solutions to small and medium sized businesses.",
	icon: "Square.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "square-online:jsGlobal:0",
			kind: "jsGlobal",
			property: "APP_ORIGIN",
			valuePattern: new RegExp("square\\.online"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"weebly",
	],
	requires: [
		"weebly",
	],
} as const satisfies TechnologyDefinition;
