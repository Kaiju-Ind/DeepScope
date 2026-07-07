import type { TechnologyDefinition } from '../../types';

export const arcTechnologyDefinition = {
	id: "arc",
	name: "Arc",
	website: "https://arc.io",
	description: "Arc is a peer-to-peer CDN that pays site owners for using it. Instead of expensive servers in distant datacenters, Arc's network is comprised of browsers.",
	icon: "Arc.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "arc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("arc\\.io\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arc:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.arc\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "arc:dom:2",
			kind: "dom",
			selector: "#arc-widget",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "arc:jsGlobal:3",
			kind: "jsGlobal",
			property: "arc.p2pClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arc:jsGlobal:4",
			kind: "jsGlobal",
			property: "arcWidgetJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:arc:arc:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
