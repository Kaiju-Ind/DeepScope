import type { TechnologyDefinition } from '../../types';

export const mageOsTechnologyDefinition = {
	id: "mage-os",
	name: "Mage-OS",
	website: "https://mage-os.org",
	description: "Mage-OS is an independent, community-driven ecommerce platform built on Magento Open Source.",
	icon: "Mage-OS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mage-os:header:0",
			kind: "header",
			key: "X-Dist",
			valuePattern: new RegExp("^Mage-OS$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mage-os:header:1",
			kind: "header",
			key: "x-dist",
			valuePattern: new RegExp("^mage-os$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
