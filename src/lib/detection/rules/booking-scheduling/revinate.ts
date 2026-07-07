import type { TechnologyDefinition } from '../../types';

export const revinateTechnologyDefinition = {
	id: "revinate",
	name: "Revinate",
	website: "https://www.revinate.com",
	description: "Revinate is a direct booking platform used in the hospitality industry to help hotels increase reservations and manage guest engagement.",
	icon: "Revinate.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "revinate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("contact-api\\.inguest\\.com\\/.*\\/revinate-form\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "revinate:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("contact-api\\.inguest\\.com\\/.*\\/revinate-form\\.js"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
