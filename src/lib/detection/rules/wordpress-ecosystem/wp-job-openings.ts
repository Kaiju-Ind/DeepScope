import type { TechnologyDefinition } from '../../types';

export const wpJobOpeningsTechnologyDefinition = {
	id: "wp-job-openings",
	name: "WP Job Openings",
	website: "https://wpjobopenings.com",
	description: "WP Job Openings is a job listing and recruitment plugin for WordPress websites.",
	icon: "WP Job Openings.svg",
	categories: [
		"wordpress-ecosystem",
		"business-tools",
	],
	rules: [
		{
			id: "wp-job-openings:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-job-openings\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-job-openings:jsGlobal:1",
			kind: "jsGlobal",
			property: "awsmJobs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:awsm:wp_job_openings:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
