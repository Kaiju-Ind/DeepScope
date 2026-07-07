import type { TechnologyDefinition } from '../../types';

export const vkPixelTechnologyDefinition = {
	id: "vk-pixel",
	name: "VK Pixel",
	website: "https://vk.com/",
	description: "VK is a Russian online social media and social networking service.",
	icon: "vk.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "vk-pixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vk\\.com\\/js\\/api\\/openapi\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vk-pixel:dom:1",
			kind: "dom",
			selector: "img[src*='vk.com/rtrg?p=VK-RTRG-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
