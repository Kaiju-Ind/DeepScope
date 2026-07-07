import type { TechnologyDefinition } from '../../types';

export const sardiusMediaTechnologyDefinition = {
	id: "sardius-media",
	name: "Sardius Media",
	website: "https://www.sardius.media",
	description: "Sardius Media is a platform focused on streamlining broadcast workflows by developing solutions that improve efficiency, organization, and content delivery across digital media platforms.",
	icon: "Sardius.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "sardius-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sardiuslive\\.sardius\\.media"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sardius-media:jsGlobal:1",
			kind: "jsGlobal",
			property: "sardius.libs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
