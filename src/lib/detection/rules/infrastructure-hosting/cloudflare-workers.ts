import type { TechnologyDefinition } from '../../types';

export const cloudflareWorkersTechnologyDefinition = {
	id: "cloudflare-workers",
	name: "Cloudflare Workers",
	website: "https://workers.cloudflare.com",
	description: "Cloudflare Workers is a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.",
	icon: "Cloudflare Workers.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cloudflare-workers:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.workers\\.dev"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "cloudflare-workers:meta:1",
			kind: "meta",
			key: "runtime",
			valuePattern: new RegExp("^Cloudflare Workers$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"cloudflare",
	],
} as const satisfies TechnologyDefinition;
