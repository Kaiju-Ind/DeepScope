import type { TechnologyDefinition } from '../../types';

export const amazonWebstoreTechnologyDefinition = {
	id: "amazon-webstore",
	name: "Amazon Webstore",
	website: "https://aws.amazon.com/marketplace/pp/Amazon-Web-Services-Amazon-Webstore/B007NLVI2S",
	description: "Amazon Webstore is an all-in-one hosted ecommerce website solution.",
	icon: "Amazon Webstore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "amazon-webstore:jsGlobal:0",
			kind: "jsGlobal",
			property: "amzn",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
