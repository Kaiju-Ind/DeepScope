import type { TechnologyDefinition } from '../../types';

export const eucookieEuTechnologyDefinition = {
	id: "eucookie-eu",
	name: "eucookie.eu",
	website: "https://www.eucookie.eu/",
	icon: "eucookie.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "eucookie-eu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("eucookie\\.eu\\/public\\/gdpr-cookie-consent\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
