import type { TechnologyDefinition } from '../../types';

export const liverampPcmTechnologyDefinition = {
	id: "liveramp-pcm",
	name: "LiveRamp PCM",
	website: "https://liveramp.com/our-platform/preference-consent-management",
	description: "LiveRamp PCM is a preference and consent management platform that enables comply with the ePrivacy Directive, GDPR, CCPA, and other data protection and privacy laws and regulations.",
	icon: "LiveRamp.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "liveramp-pcm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gdpr\\.privacymanager\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liveramp-pcm:dom:1",
			kind: "dom",
			selector: "iframe[src*='gdpr-consent-tool\\.privacymanager\\.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "liveramp-pcm:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpJsonpLiverampGdprCmp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
