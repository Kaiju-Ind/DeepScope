import type { TechnologyDefinition } from '../../types';

export const fundingChoicesTechnologyDefinition = {
	id: "funding-choices",
	name: "Funding Choices",
	website: "https://developers.google.com/funding-choices",
	description: "Funding Choices is a messaging tool that can help you comply with the EU General Data Protection Regulation (GDPR), and recover lost revenue from ad blocking users.",
	icon: "Google.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "funding-choices:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fundingchoicesmessages\\.google\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "funding-choices:dom:1",
			kind: "dom",
			selector: ".fc-consent-root, iframe[name='googlefcLoaded'], iframe[name='googlefcPresent'], .fc-dialog, .fc-choice-dialog",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "funding-choices:jsGlobal:2",
			kind: "jsGlobal",
			property: "__googlefc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "funding-choices:dns:3",
			kind: "dns",
			valuePattern: new RegExp("fundingchoicesmessages", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
