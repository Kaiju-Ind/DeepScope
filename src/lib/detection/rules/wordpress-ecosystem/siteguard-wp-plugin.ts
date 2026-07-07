import type { TechnologyDefinition } from '../../types';

export const siteguardWpPluginTechnologyDefinition = {
	id: "siteguard-wp-plugin",
	name: "SiteGuard WP Plugin",
	website: "https://www.jp-secure.com/siteguard_wp_plugin_en",
	description: "SiteGurad WP Plugin is the plugin specialised for the protection against the attack to the management page and login.",
	icon: "SiteGuard WP Plugin.png",
	categories: [
		"wordpress-ecosystem",
		"security",
	],
	rules: [
		{
			id: "siteguard-wp-plugin:dom:0",
			kind: "dom",
			selector: "img[src*='/wp-content/plugins/siteguard/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
