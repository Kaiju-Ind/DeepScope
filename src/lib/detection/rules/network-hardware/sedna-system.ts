import type { TechnologyDefinition } from '../../types';

export const sednaSystemTechnologyDefinition = {
	id: "sedna-system",
	name: "Sedna System",
	website: "https://sednasystem.io",
	description: "Sedna System is a real-time yacht management platform designed to monitor operations, track vessel status, and optimize onboard resources.",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "sedna-system:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.sednasystem\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sedna-system:dom:1",
			kind: "dom",
			selector: "iframe[src*='client.sednasystem.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
