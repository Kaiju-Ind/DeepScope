import type { TechnologyDefinition } from '../../types';

export const formTaxiTechnologyDefinition = {
	id: "form-taxi",
	name: "Form.taxi",
	website: "https://form.taxi/en/backend",
	description: "Form.taxi is a backend service that enables reliable HTML form submissions without requiring any programming.",
	icon: "FormTaxi.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "form-taxi:dom:0",
			kind: "dom",
			selector: "form[action*='form.taxi/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
