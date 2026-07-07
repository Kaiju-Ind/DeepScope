import type { TechnologyDefinition } from '../../types';

export const godaddyOnlineStoreTechnologyDefinition = {
	id: "godaddy-online-store",
	name: "GoDaddy Online Store",
	website: "https://www.godaddy.com/en-uk/websites/online-store",
	icon: "GoDaddy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "godaddy-online-store:header:0",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("^1\\.1 mysimplestore\\.com$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
