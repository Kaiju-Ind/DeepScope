import type { TechnologyDefinition } from '../../types';

export const webhealerTechnologyDefinition = {
	id: "webhealer",
	name: "Webhealer",
	website: "https://www.webhealer.net",
	description: "Webhealer is a content management system designed for managing and updating therapy-related websites.",
	icon: "Webhealer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webhealer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("umami\\.webhealer\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
