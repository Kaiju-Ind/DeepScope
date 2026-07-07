import type { TechnologyDefinition } from '../../types';

export const storyblokTechnologyDefinition = {
	id: "storyblok",
	name: "Storyblok",
	website: "https://www.storyblok.com",
	description: "Storyblok is a headless CMS with a visual editor for developers, marketers and content editors. Storyblok helps your team to manage content and digital experiences for every use-case from corporate websites, ecommerce, helpdesks, mobile apps, screen displays, and more.",
	icon: "Storyblok.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storyblok:dom:0",
			kind: "dom",
			selector: "img[src*='//a.storyblok.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "storyblok:jsGlobal:1",
			kind: "jsGlobal",
			property: "StoryblokBridge",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storyblok:jsGlobal:2",
			kind: "jsGlobal",
			property: "storyblokRegisterEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "storyblok:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("app\\.storyblok\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "storyblok:header:4",
			kind: "header",
			key: "x-frame-options",
			valuePattern: new RegExp("app\\.storyblok\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "storyblok:dom:5",
			kind: "dom",
			selector: "img[src*='//a.storyblok.com/'], img[srcset*='a.storyblok.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
