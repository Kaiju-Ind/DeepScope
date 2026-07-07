import type { TechnologyDefinition } from '../../types';

export const embedpressTechnologyDefinition = {
	id: "embedpress",
	name: "EmbedPress",
	website: "https://wordpress.org/plugins/embedpress",
	description: "Embed videos, images, posts, audio, maps and upload PDF, DOC, PPT in Wordpress.",
	icon: "EmbedPress.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "embedpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embedpress(?:\\/assets)?(?:\\/js)?(?:\\/ads)?(?:\\/pdfobject)?(?:\\/front)?(?:\\/documents-viewer-script)?(?:\\/vimeo-player)?(?:\\/initplyr)?(?:\\/plyr)?(?:\\.polyfilled)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "embedpress:dom:1",
			kind: "dom",
			selector: "#embedpress-css, #embedpress-elementor-css-css, #embedpress_blocks-cgb-style-css-css, link[href*='/wp-content/plugins/embedpress/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
