import type { TechnologyDefinition } from '../../types';

export const yandexMessengerTechnologyDefinition = {
	id: "yandex-messenger",
	name: "Yandex.Messenger",
	website: "https://dialogs.yandex.ru",
	description: "Yandex. Messenger is an instant messaging application.",
	icon: "Yandex.Messenger.svg",
	categories: [
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "yandex-messenger:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.s3\\.yandex\\.net\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yandex-messenger:jsGlobal:1",
			kind: "jsGlobal",
			property: "yandexChatWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
