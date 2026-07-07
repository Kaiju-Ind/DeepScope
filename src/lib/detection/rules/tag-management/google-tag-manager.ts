import type { TechnologyDefinition } from '../../types';

export const googleTagManagerTechnologyDefinition = {
	id: "google-tag-manager",
	name: "Google Tag Manager",
	website: "https://www.google.com/tagmanager",
	description: "Google Tag Manager is a tag management system (TMS) that allows you to quickly and easily update measurement codes and related code fragments collectively known as tags on your website or mobile app.",
	icon: "Google Tag Manager.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "google-tag-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googletagmanager\\.com\\/gtm\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-tag-manager:html:1",
			kind: "html",
			pattern: new RegExp("googletagmanager\\.com\\/ns\\.html[^>]+><\\/iframe>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "google-tag-manager:html:2",
			kind: "html",
			pattern: new RegExp("<!-- (?:End )?Google Tag Manager -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "google-tag-manager:jsGlobal:3",
			kind: "jsGlobal",
			property: "googletag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-tag-manager:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\.googletagmanager\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-tag-manager:jsGlobal:5",
			kind: "jsGlobal",
			property: "google_tag_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-tag-manager:jsGlobal:6",
			kind: "jsGlobal",
			property: "google_tag_manager",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-tag-manager:html:7",
			kind: "html",
			pattern: new RegExp("<!-- (?:end )?google tag manager -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "google-tag-manager:scriptSrc:8",
			kind: "scriptSrc",
			pattern: new RegExp("\\.googletagmanager\\.com\\/(gtm\\.js)?"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
