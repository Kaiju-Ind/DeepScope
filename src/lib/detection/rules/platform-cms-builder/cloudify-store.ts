import type { TechnologyDefinition } from '../../types';

export const cloudifyStoreTechnologyDefinition = {
	id: "cloudify-store",
	name: "Cloudify.store",
	website: "https://cloudify.store",
	description: "Cloudify.store is a subscription-based platform that allows anyone to set up a hyperlocal quick commerce business.",
	icon: "Cloudify.store.png",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "cloudify-store:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^cloudify_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"mysql",
		"php",
		"react",
	],
} as const satisfies TechnologyDefinition;
