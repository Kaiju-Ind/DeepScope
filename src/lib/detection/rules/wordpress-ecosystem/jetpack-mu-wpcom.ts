import type { TechnologyDefinition } from '../../types';

export const jetpackMuWpcomTechnologyDefinition = {
	id: "jetpack-mu-wpcom",
	name: "Jetpack MU / WordPress.com Jetpack Integration",
	website: "https://wordpress.com/support/jetpack/",
	description: "WordPress.com-hosted Jetpack module integration. This is separate from the self-hosted Jetpack plugin path.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "jetpack-mu-wpcom:html:0",
			kind: "html",
			pattern: new RegExp("JETPACK_MU_WPCOM_SETTINGS|jetpack-reblog-enabled|jetpack-mu-wpcom-plugin", "i"),
			confidence: 100,
			description: "Document contains WordPress.com Jetpack MU markers.",
		},
		{
			id: "jetpack-mu-wpcom:resourceUrl:1",
			kind: "resourceUrl",
			pattern: new RegExp("/wp-content/mu-plugins/jetpack|jetpack-mu-wpcom-plugin", "i"),
			confidence: 100,
			description: "Resource URL references WordPress.com Jetpack MU assets.",
		},
		{
			id: "jetpack-mu-wpcom:stylesheetHref:2",
			kind: "stylesheetHref",
			pattern: new RegExp("jetpack-mu-wpcom-plugin", "i"),
			confidence: 100,
			description: "Stylesheet URL references WordPress.com Jetpack MU assets.",
		},
	],
	requires: [
		"wordpress-com",
	],
} as const satisfies TechnologyDefinition;
