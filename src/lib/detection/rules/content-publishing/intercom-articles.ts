import type { TechnologyDefinition } from '../../types';

export const intercomArticlesTechnologyDefinition = {
	id: "intercom-articles",
	name: "Intercom Articles",
	website: "https://www.intercom.com/articles",
	description: "Intercom Articles is a tool to create, organise and publish help articles.",
	icon: "Intercom.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "intercom-articles:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"https:\\/\\/www.intercom.com\\/intercom-link[^\"]+solution=customer-support[^>]+>We run on Intercom"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "intercom-articles:html:1",
			kind: "html",
			pattern: new RegExp("<a href=\"https:\\/\\/www.intercom.com\\/intercom-link[^\"]+solution=customer-support[^>]+>we run on intercom"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
