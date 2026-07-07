import type { TechnologyDefinition } from '../../types';

export const microsoft365TechnologyDefinition = {
	id: "microsoft-365",
	name: "Microsoft 365",
	website: "https://www.microsoft.com/microsoft-365",
	description: "Microsoft 365 is a line of subscription services offered by Microsoft as part of the Microsoft Office product line.",
	icon: "Microsoft 365.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "microsoft-365:dns:0",
			kind: "dns",
			valuePattern: new RegExp("outlook\\.com", "i"),
			recordType: "MX",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
