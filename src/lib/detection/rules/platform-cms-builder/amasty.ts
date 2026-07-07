import type { TechnologyDefinition } from '../../types';

export const amastyTechnologyDefinition = {
	id: "amasty",
	name: "Amasty",
	website: "https://amasty.com",
	description: "Amasty is a developer of modules for Magento platforms.",
	icon: "Amasty.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "amasty:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("amasty\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amasty:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("amasty\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amasty:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("amasty\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amasty:header:3",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("amasty\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
