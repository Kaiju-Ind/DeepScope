import type { TechnologyDefinition } from '../../types';

export const dxTechnologyDefinition = {
	id: "dx",
	name: "DX",
	website: "https://www.dxdelivery.com",
	description: "DX (also known as DX Freight) is a British mail, courier and logistics company.",
	icon: "DX.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "dx:text:0",
			kind: "text",
			pattern: new RegExp("\\bDX\\b"),
			confidence: 25,
			description: "Page text mentions DX; this is corroborating evidence only.",
		},
		{
			id: "dx:resourceUrl:owned-host",
			kind: "resourceUrl",
			pattern: new RegExp("https?://[^\\s\"'<>/]*(?:dxdelivery|dxfreight)\\.[^\\s\"'<>/]+/", "i"),
			confidence: 85,
			description: "Loaded resource URL uses a DX delivery host.",
		},
	],
} as const satisfies TechnologyDefinition;
