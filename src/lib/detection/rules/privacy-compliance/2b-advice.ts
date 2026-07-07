import type { TechnologyDefinition } from '../../types';

export const technology2bAdviceTechnologyDefinition = {
	id: "2b-advice",
	name: "2B Advice",
	website: "https://www.2b-advice.com/en/data-privacy-software/cookie-consent-plugin/",
	description: "2B Advice provides a plug-in to manage GDPR cookie consent.",
	icon: "2badvice.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "2b-advice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("2badvice-cdn\\.azureedge\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "2b-advice:jsGlobal:1",
			kind: "jsGlobal",
			property: "BBCookieControler",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
