import type { TechnologyDefinition } from '../../types';

export const webpImageFormatTechnologyDefinition = {
	id: "webp-image-format",
	name: "WebP Image Assets",
	website: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image",
	description: "References WebP image assets.",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "webp-image-format:dom:type",
			kind: "dom",
			selector: "source[type='image/webp'], img[type='image/webp']",
			confidence: 100,
			description: "DOM references a WebP typed image source.",
		},
		{
			id: "webp-image-format:dom:url",
			kind: "dom",
			selector: "source[srcset*='.webp'], img[src*='.webp'], img[srcset*='.webp']",
			confidence: 90,
			description: "DOM image attributes reference WebP assets.",
		},
		{
			id: "webp-image-format:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.webp(?:\\?|$)", "i"),
			confidence: 100,
			description: "Loaded resource URL references a WebP asset.",
		},
		{
			id: "webp-image-format:link:type",
			kind: "link",
			typePattern: new RegExp("^image/webp$", "i"),
			confidence: 100,
			description: "Document links to a WebP typed resource.",
		},
	],
} as const satisfies TechnologyDefinition;
