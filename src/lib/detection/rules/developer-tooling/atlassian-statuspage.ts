import type { TechnologyDefinition } from '../../types';

export const atlassianStatuspageTechnologyDefinition = {
	id: "atlassian-statuspage",
	name: "Atlassian Statuspage",
	website: "https://www.atlassian.com/software/statuspage",
	description: "Statuspage is a status and incident communication tool.",
	icon: "Atlassian Statuspage.svg",
	categories: [
		"developer-tooling",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "atlassian-statuspage:html:0",
			kind: "html",
			pattern: new RegExp("<a[^>]*href=\"https?:\\/\\/(?:www\\.)?statuspage\\.io\\/powered-by[^>]+>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "atlassian-statuspage:dns:1",
			kind: "dns",
			valuePattern: new RegExp("status-page-domain-verification=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
