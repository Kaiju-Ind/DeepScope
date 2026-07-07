import type { TechnologyDefinition } from '../../types';

export const segmentConsentManagerTechnologyDefinition = {
	id: "segment-consent-manager",
	name: "Segment Consent Manager",
	website: "https://segment.com/blog/how-to-build-consent-management-into-your-site-in-less-than-a-week",
	description: "Segment Consent Manager is a tool that automates the process of requesting consent for data usage, stores data on user privacy preferences, and updates these preferences when users request changes.",
	icon: "Segment.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "segment-consent-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@segment\\/consent-manager@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segment-consent-manager:jsGlobal:1",
			kind: "jsGlobal",
			property: "consentManager.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
