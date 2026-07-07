import type { TechnologyDefinition } from '../../types';

export const adobeDynamicMediaClassicTechnologyDefinition = {
	id: "adobe-dynamic-media-classic",
	name: "Adobe Dynamic Media Classic",
	website: "https://business.adobe.com/uk/products/experience-manager/scene7-login.html",
	description: "Adobe Dynamic Media Classic is a platform that enables customers to manage, enhance, publish, and deliver dynamic rich media content and personal experiences to consumers across all channels and devices, including web, print material, email campaigns, desktops, social, and mobile.",
	icon: "Adobe Experience Platform.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "adobe-dynamic-media-classic:dom:0",
			kind: "dom",
			selector: "source[srcset*='.scene7.com/'], link[href*='.scene7.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adobe-dynamic-media-classic:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.scene7\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adobe-dynamic-media-classic:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.scene7\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
