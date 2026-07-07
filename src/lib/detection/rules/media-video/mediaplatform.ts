import type { TechnologyDefinition } from '../../types';

export const mediaplatformTechnologyDefinition = {
	id: "mediaplatform",
	name: "MediaPlatform",
	website: "https://www.mediaplatform.com",
	description: "MediaPlatform is enterprise video and webcasting software designed for corporate communications.",
	icon: "MediaPlatform.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "mediaplatform:jsGlobal:0",
			kind: "jsGlobal",
			property: "mediaPlatformLoginUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
