import type { TechnologyDefinition } from '../../types';

export const webAppManifestTechnologyDefinition = {
	id: "web-app-manifest",
	name: "Web App Manifest",
	website: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest",
	description: "Declares a web app manifest. This is useful mobile/installability evidence but does not prove a full PWA by itself.",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "web-app-manifest:link:0",
			kind: "link",
			rel: "manifest",
			confidence: 100,
			description: "Document links to a web app manifest.",
		},
	],
} as const satisfies TechnologyDefinition;
