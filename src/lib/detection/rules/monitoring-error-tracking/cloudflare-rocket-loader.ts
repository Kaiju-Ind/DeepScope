import type { TechnologyDefinition } from '../../types';

export const cloudflareRocketLoaderTechnologyDefinition = {
	id: "cloudflare-rocket-loader",
	name: "Cloudflare Rocket Loader",
	website: "https://support.cloudflare.com/hc/en-us/articles/200168056-Understanding-Rocket-Loader",
	description: "Cloudflare Rocket Loader is responsible for prioritising over website's content by delaying the loading of Javascript until rendering.",
	icon: "CloudFlare.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "cloudflare-rocket-loader:jsGlobal:0",
			kind: "jsGlobal",
			property: "__cfQR.done",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cloudflare-rocket-loader:jsGlobal:1",
			kind: "jsGlobal",
			property: "__cfRLUnblockHandlers",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
