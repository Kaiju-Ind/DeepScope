import type { TechnologyDefinition } from '../../types';

export const chorusTechnologyDefinition = {
	id: "chorus",
	name: "Chorus",
	website: "https://getchorus.voxmedia.com",
	description: "Chorus is the only all-in-one publishing, audience, and revenue platform built for modern media companies.",
	icon: "Chorus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "chorus:jsGlobal:0",
			kind: "jsGlobal",
			property: "Chorus.AddScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chorus:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChorusAds.beforeAdsRequested",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chorus:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChorusCampaigns.recordClickUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chorus:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_chorus_geoip_continent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "chorus:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^chorus_preferences$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
