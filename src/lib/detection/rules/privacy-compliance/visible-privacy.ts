import type { TechnologyDefinition } from '../../types';

export const visiblePrivacyTechnologyDefinition = {
	id: "visible-privacy",
	name: "Visible Privacy",
	website: "https://visibleprivacy.com/",
	description: "Visible Privacy is a privacy-focused Consent Management Platform compatible with major CMS and ecommerce systems.",
	icon: "VisiblePrivacy.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "visible-privacy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/bc-prod-config\\.empathy\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
