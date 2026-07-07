import type { TechnologyDefinition } from '../../types';

export const zakekeVisualCustomizerTechnologyDefinition = {
	id: "zakeke-visual-customizer",
	name: "Zakeke Visual Customizer",
	website: "https://www.zakeke.com",
	description: "Zakeke Visual Customizer is a cloud-connected visual ecommerce tool that allows brands and retailers to offer live, personalised, 2D, 3D, and augmented reality (AR) functionality for their products.",
	icon: "Zakeke.png",
	categories: [
		"ecommerce-extensions",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "zakeke-visual-customizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zakeke\\.com\\/Scripts\\/integration\\/shopify\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zakeke-visual-customizer:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zakeke\\.com\\/scripts\\/integration\\/shopify\\/"),
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
