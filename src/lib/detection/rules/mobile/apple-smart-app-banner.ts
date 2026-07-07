import type { TechnologyDefinition } from '../../types';

export const appleSmartAppBannerTechnologyDefinition = {
	id: "apple-smart-app-banner",
	name: "Apple Smart App Banner",
	website: "https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners",
	description: "Declares an iOS Smart App Banner that can promote an App Store app from the website.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "apple-smart-app-banner:meta:0",
			kind: "meta",
			key: "apple-itunes-app",
			confidence: 100,
			description: "Document declares an Apple Smart App Banner.",
		},
	],
} as const satisfies TechnologyDefinition;
