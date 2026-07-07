import type { TechnologyDefinition } from '../../types';

export const voxMediaTechnologyDefinition = {
	id: "vox-media",
	name: "Vox Media",
	website: "https://corp.voxmedia.com",
	description: "Vox Media is a digital platform that operates news and opinion websites.",
	icon: "VoxMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vox-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.voxmedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vox-media:jsGlobal:1",
			kind: "jsGlobal",
			property: "VoxMediaFontLoader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
