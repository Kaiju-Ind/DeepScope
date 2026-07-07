import type { TechnologyDefinition } from '../../types';

export const snapPixelTechnologyDefinition = {
	id: "snap-pixel",
	name: "Snap Pixel",
	website: "https://businesshelp.snapchat.com/s/article/snap-pixel-about",
	description: "Snap Pixel is a piece of JavaScript code that helps advertisers measure the cross-device impact of campaigns.",
	icon: "Snap Pixel.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "snap-pixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("intg\\.snapchat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snap-pixel:jsGlobal:1",
			kind: "jsGlobal",
			property: "__SnapPixel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snap-pixel:jsGlobal:2",
			kind: "jsGlobal",
			property: "snaptr.pixelIdList",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snap-pixel:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("_snapchat_pixel_id"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
