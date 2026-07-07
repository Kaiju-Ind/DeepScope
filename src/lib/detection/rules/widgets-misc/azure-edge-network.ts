import type { TechnologyDefinition } from '../../types';

export const azureEdgeNetworkTechnologyDefinition = {
	id: "azure-edge-network",
	name: "Azure Edge Network",
	website: "https://learn.microsoft.com/en-us/azure/cdn/cdn-overview",
	description: "Azure Edge Network is a global network infrastructure provided by Microsoft Azure. It is designed to deliver content, applications, and services to end-users with low latency and high performance. The Azure Edge Network consists of a combination of Azure Content Delivery Network (CDN), Azure Front Door, and Azure Traffic Manager.",
	icon: "Azure.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "azure-edge-network:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.azureedge\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "azure-edge-network:dom:1",
			kind: "dom",
			selector: "link[href*='.azureedge.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "azure-edge-network:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.azureedge\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
