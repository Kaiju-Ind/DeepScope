import type { TechnologyDefinition } from '../../types';

export const miniorangeLoginTechnologyDefinition = {
	id: "miniorange-login",
	name: "MiniOrange Login",
	website: "https://wordpress.org/plugins/miniorange-login-openid",
	description: "Social Login with Discord, Facebook, Google, Twitter, LinkedIn and other apps.",
	icon: "MiniOrange Login.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "miniorange-login:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("miniorange-login-openid\\/includes\\/js(?:\\/mo_openid_jquery)?(?:\\/mo-openid-social_login)?(?:\\/social_login)?(?:\\/jquery)?(?:\\.cookie)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "miniorange-login:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/miniorange-login-openid/'], #js-cookie-script-js, #mo-social-login-script-js",
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
