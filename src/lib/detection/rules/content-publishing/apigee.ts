import type { TechnologyDefinition } from '../../types';

export const apigeeTechnologyDefinition = {
	id: "apigee",
	name: "Apigee",
	website: "https://cloud.google.com/apigee/",
	description: "Apigee is an API gateway management tool to exchange data across cloud services and applications.",
	icon: "Apigee.svg",
	categories: [
		"content-publishing",
		"widgets-misc",
	],
	rules: [
		{
			id: "apigee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/profiles\\/apigee"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
