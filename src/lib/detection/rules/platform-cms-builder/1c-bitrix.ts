import type { TechnologyDefinition } from '../../types';

export const technology1cBitrixTechnologyDefinition = {
	id: "1c-bitrix",
	name: "1C-Bitrix",
	website: "https://www.1c-bitrix.ru",
	description: "1C-Bitrix is a system of web project management, universal software for the creation, support and successful development of corporate websites and online stores.",
	icon: "1C-Bitrix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "1c-bitrix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bitrix(?:\\.info\\/|\\/js\\/main\\/core)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^BITRIX_SM_GUEST_ID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^BITRIX_SM_LAST_IP$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^BITRIX_SM_SALE_UID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:header:4",
			kind: "header",
			key: "Set-Cookie",
			valuePattern: new RegExp("BITRIX_", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "1c-bitrix:header:5",
			kind: "header",
			key: "X-Powered-CMS",
			valuePattern: new RegExp("Bitrix Site Manager", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^bitrix_sm_guest_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^bitrix_sm_last_ip$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^bitrix_sm_sale_uid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "1c-bitrix:header:9",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("bitrix_", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "1c-bitrix:header:10",
			kind: "header",
			key: "x-powered-cms",
			valuePattern: new RegExp("bitrix site manager", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
