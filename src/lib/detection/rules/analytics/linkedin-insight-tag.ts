import type { TechnologyDefinition } from '../../types';

export const linkedinInsightTagTechnologyDefinition = {
	id: "linkedin-insight-tag",
	name: "Linkedin Insight Tag",
	website: "https://business.linkedin.com/marketing-solutions/insight-tag",
	description: "LinkedIn Insight Tag is a lightweight JavaScript tag that powers conversion tracking, website audiences, and website demographics.",
	icon: "Linkedin.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "linkedin-insight-tag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("snap\\.licdn\\.com\\/li\\.lms-analytics\\/insight\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linkedin-insight-tag:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.oribi\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linkedin-insight-tag:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("_linkedin_partner_id"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "linkedin-insight-tag:jsGlobal:3",
			kind: "jsGlobal",
			property: "ORIBI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkedin-insight-tag:jsGlobal:4",
			kind: "jsGlobal",
			property: "_linkedin_data_partner_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkedin-insight-tag:jsGlobal:5",
			kind: "jsGlobal",
			property: "_linkedin_partner_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkedin-insight-tag:header:6",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.licdn\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
