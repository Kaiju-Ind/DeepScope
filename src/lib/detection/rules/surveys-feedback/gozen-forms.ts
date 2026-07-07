import type { TechnologyDefinition } from '../../types';

export const gozenFormsTechnologyDefinition = {
	id: "gozen-forms",
	name: "GoZen Forms",
	website: "https://gozen.io/forms/",
	description: "GoZen Forms is an AI-powered no-code form builder that automates form creation, collects signup data, payments, and e-signatures.",
	icon: "GoZenForms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "gozen-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("signup-forms-cdn\\.app\\.gozen\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gozen-forms:jsGlobal:1",
			kind: "jsGlobal",
			property: "GzFormAjax.send",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gozen-forms:jsGlobal:2",
			kind: "jsGlobal",
			property: "GzFormMain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gozen-forms:jsGlobal:3",
			kind: "jsGlobal",
			property: "GzFormPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gozen-forms:jsGlobal:4",
			kind: "jsGlobal",
			property: "GzForms",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
