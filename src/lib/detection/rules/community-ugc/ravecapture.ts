import type { TechnologyDefinition } from '../../types';

export const ravecaptureTechnologyDefinition = {
	id: "ravecapture",
	name: "RaveCapture",
	website: "https://ravecapture.com",
	description: "RaveCapture is a platform for ecommerce stores to collect customer reviews, user-generated content, and survey responses in a single system to support trust-building and customer feedback management.",
	icon: "RaveCapture.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "ravecapture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trustspot\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ravecapture:jsGlobal:1",
			kind: "jsGlobal",
			property: "trustspot_key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
