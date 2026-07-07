import type { TechnologyDefinition } from '../../types';

export const batchTechnologyDefinition = {
	id: "batch",
	name: "Batch",
	website: "https://batch.com",
	description: "Batch is a web-push notifications technology provider.",
	icon: "Batch.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "batch:jsGlobal:0",
			kind: "jsGlobal",
			property: "batchSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "batch:jsGlobal:1",
			kind: "jsGlobal",
			property: "batchSDKUIConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "batch:jsGlobal:2",
			kind: "jsGlobal",
			property: "reregisterBatchPushIfNeeded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
