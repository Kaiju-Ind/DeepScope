import type { TechnologyDefinition } from '../../types';

export const googleHostedLibrariesTechnologyDefinition = {
	id: "google-hosted-libraries",
	name: "Google Hosted Libraries",
	website: "https://developers.google.com/speed/libraries",
	description: "Google Hosted Libraries is a stable, reliable, high-speed, globally available content distribution network for the most popular, open-source JavaScript libraries.",
	icon: "Google Developers.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "google-hosted-libraries:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ajax\\.googleapis\\.com\\/ajax\\/libs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-hosted-libraries:dom:1",
			kind: "dom",
			selector: "link[href*='ajax.googleapis.com/ajax/libs']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
