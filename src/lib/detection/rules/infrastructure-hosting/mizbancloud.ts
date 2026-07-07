import type { TechnologyDefinition } from '../../types';

export const mizbancloudTechnologyDefinition = {
	id: "mizbancloud",
	name: "MizbanCloud",
	website: "https://mizbancloud.com",
	description: "MizbanCloud is a total cloud infrastructure solutions, CDN service provider and Cloud Computing Services, Cloud DNS, Cloud Security, VoD Streaming Service, Live Streaming, Cloud Object Storage.",
	icon: "MizbanCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "mizbancloud:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^MizbanCloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mizbancloud:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^mizbancloud$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
