import type { TechnologyDefinition } from '../../types';

export const sprocketTechnologyDefinition = {
	id: "sprocket",
	name: "Sprocket",
	website: "https://www.sprocket.bz",
	description: "Sprocket is an analytics and tracking system from Japan.",
	icon: "Sprocket.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sprocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sprocket\\.bz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sprocket:jsGlobal:1",
			kind: "jsGlobal",
			property: "sprocketMunicipalities",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sprocket:jsGlobal:2",
			kind: "jsGlobal",
			property: "sprocketSpots",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sprocket:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_sprocket_$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
