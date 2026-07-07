import type { TechnologyDefinition } from '../../types';

export const lunaTechnologyDefinition = {
	id: "luna",
	name: "Luna",
	website: "https://luna.io",
	description: "Luna is a company that sells software that aids eyewear companies sell their products online using virtual fitting.",
	icon: "Luna.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "luna:dom:0",
			kind: "dom",
			selector: "link[href*='bsdk.api.ditto.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "luna:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ditto.__esModule",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luna:jsGlobal:2",
			kind: "jsGlobal",
			property: "dittoIdLifetime",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luna:jsGlobal:3",
			kind: "jsGlobal",
			property: "globalDittoKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luna:jsGlobal:4",
			kind: "jsGlobal",
			property: "globalDittoServer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luna:jsGlobal:5",
			kind: "jsGlobal",
			property: "jstextmap.DittoSdkUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luna:header:6",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("bsdk\\.api\\.ditto.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "luna:header:7",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("bsdk\\.api\\.ditto.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
