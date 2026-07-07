import type { TechnologyDefinition } from '../../types';

export const appleWebAppMetaTechnologyDefinition = {
	id: "apple-web-app-meta",
	name: "Apple Web App Metadata",
	website: "https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html",
	description: "Declares Apple-specific metadata for iOS Home Screen web apps, icons, titles, launch screens, and standalone display.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "apple-web-app-meta:meta:capable",
			kind: "meta",
			key: "apple-mobile-web-app-capable",
			valuePattern: new RegExp("^(?:yes|no)$", "i"),
			confidence: 100,
			description: "Document declares whether an iOS web app can launch in standalone mode.",
		},
		{
			id: "apple-web-app-meta:meta:title",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			confidence: 90,
			description: "Document declares an iOS Home Screen web app title.",
		},
		{
			id: "apple-web-app-meta:meta:status-bar-style",
			kind: "meta",
			key: "apple-mobile-web-app-status-bar-style",
			valuePattern: new RegExp("^(?:default|black|black-translucent)$", "i"),
			confidence: 90,
			description: "Document declares an iOS standalone web app status bar style.",
		},
		{
			id: "apple-web-app-meta:link:touch-icon",
			kind: "link",
			rel: "apple-touch-icon",
			confidence: 85,
			description: "Document links an iOS Home Screen web app icon.",
		},
		{
			id: "apple-web-app-meta:link:startup-image",
			kind: "link",
			rel: "apple-touch-startup-image",
			confidence: 75,
			description: "Document links an iOS launch screen image.",
		},
	],
} as const satisfies TechnologyDefinition;
