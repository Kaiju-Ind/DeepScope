import type { TechnologyDefinition } from '../../types';

export const jumpcloudTechnologyDefinition = {
	id: "jumpcloud",
	name: "JumpCloud",
	website: "https://jumpcloud.com",
	description: "JumpCloud is a cloud-based directory services platform offering single sign-on (SSO) and Active Directory-as-a-Service (ADaaS) functionalities.",
	icon: "JumpCloud.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "jumpcloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jumpcloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jumpcloud:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_jumpcloud_user_console_$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
