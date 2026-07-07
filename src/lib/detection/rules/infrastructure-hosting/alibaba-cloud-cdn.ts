import type { TechnologyDefinition } from '../../types';

export const alibabaCloudCdnTechnologyDefinition = {
	id: "alibaba-cloud-cdn",
	name: "Alibaba Cloud CDN",
	website: "https://www.alibabacloud.com/product/content-delivery-network",
	description: "Alibaba Cloud CDN is a global network of servers designed to deliver high-performance, low-latency content to users around the world. It is a cloud-based service provided by Alibaba Cloud, a subsidiary of the Alibaba Group, that enables businesses to accelerate the delivery of their web content, including images, videos, and static files, to end-users.",
	icon: "Alibaba Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "alibaba-cloud-cdn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.alicdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alibaba-cloud-cdn:dom:1",
			kind: "dom",
			selector: "img[src*='.alicdn.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
