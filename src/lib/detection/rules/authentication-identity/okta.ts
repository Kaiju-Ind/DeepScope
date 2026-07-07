import type { TechnologyDefinition } from '../../types';

export const oktaTechnologyDefinition = {
	id: "okta",
	name: "Okta",
	website: "https://developer.okta.com",
	description: "Okta is a platform in the Identity-as-a-Service (IDaaS) category. Okta features include Provisioning, Single Sign-On (SSO), Active Directory (AD) and LDAP integration, the centralized de-provisioning of users, multi-factor authentication (MFA), mobile identity management.",
	icon: "Okta.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "okta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("oktacdn\\.com\\/.+\\/([\\d.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "okta:jsGlobal:1",
			kind: "jsGlobal",
			property: "OktaAuth",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okta:jsGlobal:2",
			kind: "jsGlobal",
			property: "isOktaEnabled",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okta:jsGlobal:3",
			kind: "jsGlobal",
			property: "okta.cdnUrlHostname",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okta:jsGlobal:4",
			kind: "jsGlobal",
			property: "okta.locale",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "okta:jsGlobal:5",
			kind: "jsGlobal",
			property: "oktaCurrentSessionUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:okta:*:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
