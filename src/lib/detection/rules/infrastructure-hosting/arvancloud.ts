import type { TechnologyDefinition } from '../../types';

export const arvancloudTechnologyDefinition = {
	id: "arvancloud",
	name: "ArvanCloud",
	website: "https://www.arvancloud.ir",
	description: "ArvanCloud is a cloud services provider, offering a wide range of incorporated cloud services including CDN, DDoS mitigation, Cloud Managed DNS, Cloud Security, VoD/AoD Streaming, Live Streaming, Cloud Compute, Cloud Object Storage, and PaaS.",
	icon: "ArvanCloud.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "arvancloud:dom:0",
			kind: "dom",
			selector: "img[src*='.arvanstorage.com/'], img[src*='.arvanstorage.ir/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "arvancloud:jsGlobal:1",
			kind: "jsGlobal",
			property: "ArvanCloud",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arvancloud:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("ArvanCloud", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "arvancloud:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("arvancloud", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
