import type { TechnologyDefinition } from '../../types';

export const pwaTechnologyDefinition = {
	id: "pwa",
	name: "Web App Manifest",
	website: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest",
	description: "A web app manifest provides metadata used when a site is installed or presented like an app. A manifest link alone does not prove the site is a complete Progressive Web App.",
	icon: "PWA.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pwa:link:0",
			kind: "link",
			rel: "manifest",
			confidence: 45,
			description: "Document links to a web app manifest. This is installability metadata, not full PWA proof by itself.",
		},
	],
} as const satisfies TechnologyDefinition;
