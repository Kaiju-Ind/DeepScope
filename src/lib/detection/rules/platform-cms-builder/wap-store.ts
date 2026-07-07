import type { TechnologyDefinition } from '../../types';

export const wapStoreTechnologyDefinition = {
	id: "wap-store",
	name: "wap.store",
	website: "https://www.wapstore.com.br",
	description: "The wap.store provides a range of services for ecommerce businesses, including a platform, a marketplace hub, and a digital agency.",
	icon: "wap.store.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wap-store:jsGlobal:0",
			kind: "jsGlobal",
			property: "WapStore.categoria",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
	],
} as const satisfies TechnologyDefinition;
