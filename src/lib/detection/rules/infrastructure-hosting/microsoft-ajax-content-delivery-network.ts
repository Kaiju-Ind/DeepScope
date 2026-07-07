import type { TechnologyDefinition } from '../../types';

export const microsoftAjaxContentDeliveryNetworkTechnologyDefinition = {
	id: "microsoft-ajax-content-delivery-network",
	name: "Microsoft Ajax Content Delivery Network",
	website: "https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview",
	description: "Microsoft Ajax Content Delivery Network hosts popular third party JavaScript libraries such as jQuery and enables you to easily add them to your web applications.",
	icon: "Microsoft.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "microsoft-ajax-content-delivery-network:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ajax\\.aspnetcdn\\.com\\/ajax\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
