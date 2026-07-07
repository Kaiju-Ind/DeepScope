import type { TechnologyDefinition } from '../../types';

export const virtfusionTechnologyDefinition = {
	id: "virtfusion",
	name: "VirtFusion",
	website: "https://virtfusion.com",
	description: "VirtFusion is a modern virtualization management platform designed for hosting providers to manage virtual machines, users, billing integrations, and infrastructure operations through a centralized interface.",
	icon: "VirtFusion.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "virtfusion:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^virtfusion_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
