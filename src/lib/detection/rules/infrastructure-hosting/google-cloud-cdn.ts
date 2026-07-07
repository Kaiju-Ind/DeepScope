import type { TechnologyDefinition } from '../../types';

export const googleCloudCdnTechnologyDefinition = {
	id: "google-cloud-cdn",
	name: "Google Cloud CDN",
	website: "https://cloud.google.com/cdn",
	description: "Cloud CDN uses Google's global edge network to serve content closer to users.",
	icon: "google-cloud-cdn.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "google-cloud-cdn:header:0",
			kind: "header",
			key: "Via",
			valuePattern: new RegExp("^1\\.1 google$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-cloud-cdn:header:1",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("^1\\.1 google$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"google-cloud",
	],
} as const satisfies TechnologyDefinition;
