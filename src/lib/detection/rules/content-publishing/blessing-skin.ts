import type { TechnologyDefinition } from '../../types';

export const blessingSkinTechnologyDefinition = {
	id: "blessing-skin",
	name: "Blessing Skin",
	website: "https://github.com/bs-community/blessing-skin-server",
	description: "Blessing Skin is a plubin that brings your custom skins back in offline Minecraft servers.",
	icon: "Blessing Skin.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "blessing-skin:jsGlobal:0",
			kind: "jsGlobal",
			property: "blessing.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
