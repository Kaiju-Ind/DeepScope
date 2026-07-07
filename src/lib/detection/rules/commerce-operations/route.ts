import type { TechnologyDefinition } from '../../types';

export const routeTechnologyDefinition = {
	id: "route",
	name: "Route",
	website: "https://route.com/",
	description: "Route is a delivery and shipping tracking app.",
	icon: "route.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "route:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/cdn.routeapp.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "route:jsGlobal:1",
			kind: "jsGlobal",
			property: "Routeapp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "route:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.routeapp\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "route:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.routeapp\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "route:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("shopify-widget\\.route\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "route:jsGlobal:5",
			kind: "jsGlobal",
			property: "routeWidgetInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
