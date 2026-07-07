import type { TechnologyDefinition } from '../../types';

export const pciProxyTechnologyDefinition = {
	id: "pci-proxy",
	name: "PCI Proxy",
	website: "https://www.pci-proxy.com",
	description: "PCI Proxy is a tokenization platform that enables organisations worldwide to embrace a modern approach to payment flexibility and data security.",
	icon: "PCI Proxy.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pci-proxy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.datatrans\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "pci-proxy:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.datatrans\\.(?:com|biz)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
