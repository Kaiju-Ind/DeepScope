import type { TechnologyDefinition } from '../../types';

export const goldenVolunteerTechnologyDefinition = {
	id: "golden-volunteer",
	name: "Golden Volunteer",
	website: "https://www.goldenvolunteer.com",
	description: "Golden Volunteer is a volunteer management platform that uses automation and fundraising AI to streamline tasks, ensure compliance, and support volunteer-to-donor conversion.",
	icon: "GoldenVolunteer.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "golden-volunteer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.goldenvolunteer\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "golden-volunteer:dom:1",
			kind: "dom",
			selector: "link[href*='.goldenvolunteer.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "golden-volunteer:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.goldenvolunteer\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "golden-volunteer:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.goldenvolunteer\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
