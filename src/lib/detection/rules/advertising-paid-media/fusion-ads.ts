import type { TechnologyDefinition } from '../../types';

export const fusionAdsTechnologyDefinition = {
	id: "fusion-ads",
	name: "Fusion Ads",
	website: "https://fusionads.net",
	icon: "Fusion Ads.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "fusion-ads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^[^\\/]*\\/\\/[ac]dn\\.fusionads\\.net\\/(?:api\\/([\\d.]+)\\/)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fusion-ads:jsGlobal:1",
			kind: "jsGlobal",
			property: "_fusion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
