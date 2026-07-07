import type { TechnologyDefinition } from '../../types';

export const pixiesetStoreTechnologyDefinition = {
	id: "pixieset-store",
	name: "Pixieset Store",
	website: "https://pixieset.com",
	description: "Pixieset Store lets you sell professional print products, digital downloads, and other items directly from your galleries.",
	icon: "Pixieset.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixieset-store:jsGlobal:0",
			kind: "jsGlobal",
			property: "PixiesetProductEditor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixieset-store:jsGlobal:1",
			kind: "jsGlobal",
			property: "PixiesetProductOptionSelection",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
