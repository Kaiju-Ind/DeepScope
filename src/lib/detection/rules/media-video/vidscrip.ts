import type { TechnologyDefinition } from '../../types';

export const vidscripTechnologyDefinition = {
	id: "vidscrip",
	name: "Vidscrip",
	website: "https://studio.vidscrip.com",
	description: "Vidscrip is a digital platform that enables physicians to communicate with patients through personalized video content, enhancing patient engagement and improving care coordination.",
	icon: "Vidscrip.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "vidscrip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vidscrip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vidscrip:jsGlobal:1",
			kind: "jsGlobal",
			property: "addVidscripWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
