import type { TechnologyDefinition } from '../../types';

export const protonMailTechnologyDefinition = {
	id: "proton-mail",
	name: "Proton Mail",
	website: "https://proton.me/mail",
	description: "Proton Mail is the world’s largest secure email service with over 70 million users. Available on Web, iOS, Android, and desktop. Protected by Swiss privacy law.",
	icon: "Proton Mail.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "proton-mail:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.protonmail\\.ch", "i"),
			recordType: "MX",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "proton-mail:dns:1",
			kind: "dns",
			valuePattern: new RegExp("protonmail-verification=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
