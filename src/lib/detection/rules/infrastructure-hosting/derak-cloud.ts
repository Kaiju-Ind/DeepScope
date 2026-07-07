import type { TechnologyDefinition } from '../../types';

export const derakCloudTechnologyDefinition = {
	id: "derak-cloud",
	name: "DERAK.CLOUD",
	website: "https://derak.cloud",
	icon: "DerakCloud.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "derak-cloud:jsGlobal:0",
			kind: "jsGlobal",
			property: "derakCloud.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "derak-cloud:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^__derak_auth$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "derak-cloud:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^__derak_user$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "derak-cloud:header:3",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^DERAK\\.CLOUD$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "derak-cloud:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^derak\\.cloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
