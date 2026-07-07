import type { TechnologyDefinition } from '../../types';

export const modalFormsTechnologyDefinition = {
	id: "modal-forms",
	name: "Modal Forms",
	website: "https://www.modalforms.com",
	description: "Modal Forms is a tool that enhances your website by adding interactive pop-ups.",
	icon: "ModalForms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "modal-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.modalforms\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
