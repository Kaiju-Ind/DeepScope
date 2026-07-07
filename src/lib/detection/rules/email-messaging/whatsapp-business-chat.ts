import type { TechnologyDefinition } from '../../types';

export const whatsappBusinessChatTechnologyDefinition = {
	id: "whatsapp-business-chat",
	name: "WhatsApp Business Chat",
	website: "https://www.whatsapp.com/business",
	description: "WhatsApp Business is a free to download app available on Android and iPhone using which businesses can connect with their customers.",
	icon: "WhatsApp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "whatsapp-business-chat:dom:0",
			kind: "dom",
			selector: "a[href*='api.whatsapp.com/send'], a[href*='web.whatsapp.com/send'], a[href*='wa.me/'], div[class*='wptwa-container'], a[href*='wa.link'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "whatsapp-business-chat:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/plugins\\/creame-whatsapp-me.*joinchat\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "whatsapp-business-chat:dom:2",
			kind: "dom",
			selector: "a[href*='api.whatsapp.com/send'], a[href*='web.whatsapp.com/send'], div[class*='wptwa-container'], a[href*='wa.link'][target='_blank'], link[href*='plugins/creame-whatsapp-me']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
