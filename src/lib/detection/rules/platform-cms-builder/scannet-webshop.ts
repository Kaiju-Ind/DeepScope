import type { TechnologyDefinition } from '../../types';

export const scannetWebshopTechnologyDefinition = {
	id: "scannet-webshop",
	name: "ScanNet Webshop",
	website: "https://www.scannet.dk",
	description: "ScanNet Webshop is an ecommerce solution from Denmark designed to support online retail operations with core web shop functionality.",
	icon: "ScanNetWebshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scannet-webshop:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ScanNet Webshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "scannet-webshop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^scannet webshop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
