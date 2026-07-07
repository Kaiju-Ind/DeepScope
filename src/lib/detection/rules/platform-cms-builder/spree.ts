import type { TechnologyDefinition } from '../../types';

export const spreeTechnologyDefinition = {
	id: "spree",
	name: "Spree",
	website: "https://spreecommerce.org",
	description: "Spree is an open-source ecommerce framework built with Ruby on Rails, providing a customisable and modular platform for building online storefronts.",
	icon: "Spree.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "spree:html:0",
			kind: "html",
			pattern: new RegExp("(?:<link[^>]*\\/assets\\/store\\/all-[a-z\\d]{32}\\.css[^>]+>|<script>\\s*Spree\\.(?:routes|translations|api_key))"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "spree:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spree",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spree:jsGlobal:2",
			kind: "jsGlobal",
			property: "SpreeAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spree:html:3",
			kind: "html",
			pattern: new RegExp("(?:<link[^>]*\\/assets\\/store\\/all-[a-z\\d]{32}\\.css[^>]+>|<script>\\s*spree\\.(?:routes|translations|api_key))"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:spreecommerce:spree:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
