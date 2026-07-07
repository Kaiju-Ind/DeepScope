import type { TechnologyDefinition } from '../../types';

export const wordpressProjectManagerTechnologyDefinition = {
	id: "wordpress-project-manager",
	name: "WordPress Project Manager",
	website: "https://wedevs.com/wp-project-manager-pro",
	description: "WordPress Project Manager is an open-source project management tool designed to organize tasks and ensure timely project delivery.",
	icon: "WPProjectManager.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "wordpress-project-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wedevs-project-manager\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
