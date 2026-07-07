import type { TechnologyDefinition } from '../../types';

export const zakekeInteractiveProductDesignerTechnologyDefinition = {
	id: "zakeke-interactive-product-designer",
	name: "Zakeke Interactive Product Designer",
	website: "https://www.zakeke.com",
	description: "Zakeke Interactive Product Designer allows customers to personalize any product and visualise how they’ll look before checking out.",
	icon: "Zakeke.png",
	categories: [
		"wordpress-ecosystem",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "zakeke-interactive-product-designer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/zakeke-interactive-product-designer\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"zakeke",
	],
	requires: [
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
