import type { TechnologyDefinition } from '../../types';

export const wagtailTechnologyDefinition = {
	id: "wagtail",
	name: "Wagtail",
	website: "https://wagtail.org",
	description: "Wagtail is a Django content management system (CMS) focused on flexibility and user experience.",
	icon: "Wagtail.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wagtail:dom:0",
			kind: "dom",
			selector: "[data-block-key]",
			confidence: 85,
			description: "DOM contains Wagtail StreamField block keys.",
		},
		{
			id: "wagtail:resourceUrl:image-rendition",
			kind: "resourceUrl",
			pattern: new RegExp("(?:\\/media)?\\/(?:original_images|images)\\/[\\w.-]+\\.(?:(?:fill|max|min)-\\d+x\\d+(?:-c\\d+)?|(?:width|height|scale)-\\d+|original)\\.", "i"),
			confidence: 85,
			description: "Loaded resource URL matches Wagtail image rendition path conventions.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:torchbox:wagtail:*:*:*:*:*:*:*:*",
	},
	implies: [
		"django",
		"python",
	],
} as const satisfies TechnologyDefinition;
