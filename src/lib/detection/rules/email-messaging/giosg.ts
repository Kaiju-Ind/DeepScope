import type { TechnologyDefinition } from '../../types';

export const giosgTechnologyDefinition = {
	id: "giosg",
	name: "Giosg",
	website: "https://www.giosg.com",
	description: "Giosg is a live chat solution designed to support ecommerce platforms by enabling real-time customer communication and engagement.",
	icon: "Giosg.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "giosg:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("service\\.giosg\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "giosg:jsGlobal:1",
			kind: "jsGlobal",
			property: "giosgWebpackJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
