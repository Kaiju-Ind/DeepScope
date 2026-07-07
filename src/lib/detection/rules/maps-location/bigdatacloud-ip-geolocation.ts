import type { TechnologyDefinition } from '../../types';

export const bigdatacloudIpGeolocationTechnologyDefinition = {
	id: "bigdatacloud-ip-geolocation",
	name: "BigDataCloud IP Geolocation",
	website: "https://www.bigdatacloud.com/packages/ip-geolocation",
	description: "BigDataCloud IP Geolocation API provides detailed and accurate locality and security metrics of an IP address.",
	icon: "BigDataCloud-IPGeolocation.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "bigdatacloud-ip-geolocation:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bigdatacloud\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bigdatacloud-ip-geolocation:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.bigdatacloud\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
