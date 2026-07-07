import type { TechnologyDefinition } from '../../types';

export const acquiaCloudPlatformCdnTechnologyDefinition = {
	id: "acquia-cloud-platform-cdn",
	name: "Acquia Cloud Platform CDN",
	website: "https://docs.acquia.com/cloud-platform/platformcdn/",
	icon: "acquia-cloud-platform.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "acquia-cloud-platform-cdn:header:0",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("Acquia Platform CDN (.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "acquia-cloud-platform-cdn:header:1",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("acquia platform cdn (.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform",
	],
} as const satisfies TechnologyDefinition;
