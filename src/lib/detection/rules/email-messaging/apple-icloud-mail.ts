import type { TechnologyDefinition } from '../../types';

export const appleIcloudMailTechnologyDefinition = {
	id: "apple-icloud-mail",
	name: "Apple iCloud Mail",
	website: "https://www.apple.com/icloud/",
	description: "Apple iCloud Mail is a webmail service provided by Apple, Inc.",
	icon: "Apple.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "apple-icloud-mail:dns:0",
			kind: "dns",
			valuePattern: new RegExp("mail\\.icloud\\.com", "i"),
			recordType: "MX",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "apple-icloud-mail:dns:1",
			kind: "dns",
			valuePattern: new RegExp("apple-domain", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "apple-icloud-mail:dns:2",
			kind: "dns",
			valuePattern: new RegExp("redirect=icloud\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
