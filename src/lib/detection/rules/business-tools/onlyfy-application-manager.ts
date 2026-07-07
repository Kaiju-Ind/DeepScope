import type { TechnologyDefinition } from '../../types';

export const onlyfyApplicationManagerTechnologyDefinition = {
	id: "onlyfy-application-manager",
	name: "onlyfy Application Manager",
	website: "https://recruiting.xing.com/en/products/application-manager",
	description: "onlyfy Application Manager is applicant tracking and recruitment software formerly known as Prescreen, designed to manage hiring processes and candidate applications.",
	icon: "Onlyfy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "onlyfy-application-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("prescreen\\.io\\/.*iframeWidget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onlyfy-application-manager:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("prescreen\\.io\\/.*iframewidget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
