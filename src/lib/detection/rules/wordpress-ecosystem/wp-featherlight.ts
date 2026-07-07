import type { TechnologyDefinition } from '../../types';

export const wpFeatherlightTechnologyDefinition = {
	id: "wp-featherlight",
	name: "WP Featherlight",
	website: "https://wordpress.org/plugins/wp-featherlight",
	description: "WP Featherlight is a WordPress lightbox plugin for adding a minimal, high-performance, responsive jQuery lightbox to your WordPress website.",
	icon: "WP_Featherlight.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-featherlight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wpFeatherlight\\.pkgd\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-featherlight:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wpfeatherlight\\.pkgd\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
