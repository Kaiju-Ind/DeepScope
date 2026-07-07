import type { TechnologyDefinition } from '../../types';

export const storefrontUiTechnologyDefinition = {
	id: "storefront-ui",
	name: "Storefront UI",
	website: "https://vuestorefront.io/storefront-ui",
	description: "Storefront UI is an independent, Vue. js-based, library of UI components.",
	icon: "Storefront UI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "storefront-ui:dom:0",
			kind: "dom",
			selector: "link[href*='/dist/sfui']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
