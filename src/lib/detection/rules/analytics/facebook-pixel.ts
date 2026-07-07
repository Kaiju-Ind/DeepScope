import type { TechnologyDefinition } from '../../types';

export const facebookPixelTechnologyDefinition = {
	id: "facebook-pixel",
	name: "Facebook Pixel",
	website: "https://facebook.com",
	description: "Facebook pixel is an analytics tool that allows you to measure the effectiveness of your advertising.",
	icon: "Facebook.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "facebook-pixel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.facebook.\\w+\\/signals\\/config\\/\\d+\\?v=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "facebook-pixel:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.facebook\\.\\w+\\/.+\\/fbevents\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "facebook-pixel:dom:2",
			kind: "dom",
			selector: "img[src*='facebook.com/tr']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "facebook-pixel:jsGlobal:3",
			kind: "jsGlobal",
			property: "_fbq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "facebook-pixel:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("(?:^|\\/\\/)(?:www\\.)?connect\\.facebook\\.net\\/(?:[A-Za-z_-]+\\/)?(?:fbevents|events)\\.js(?:\\?[^\"']*)?"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "facebook-pixel:jsGlobal:5",
			kind: "jsGlobal",
			property: "_fbp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
