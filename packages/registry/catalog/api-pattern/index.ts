import type { TechnologyDefinition } from "../../types.ts";
import { amplifyJsTechnologyDefinition } from "./amplify-js.ts";
import { animeJsTechnologyDefinition } from "./anime-js.ts";
import { apiSpreadsheetsTechnologyDefinition } from "./api-spreadsheets.ts";
import { apiaryTechnologyDefinition } from "./apiary.ts";
import { bowserTechnologyDefinition } from "./bowser.ts";
import { connectionAllowlistsTechnologyDefinition } from "./connection-allowlists.ts";
import { customizableSelectTechnologyDefinition } from "./customizable-select.ts";
import { declarativeShadowDomSlotAssignmentTechnologyDefinition } from "./declarative-shadow-dom-slot-assignment.ts";
import { dialogClosedbyTechnologyDefinition } from "./dialog-closedby.ts";
import { dimpleTechnologyDefinition } from "./dimple.ts";
import { facilitatedPaymentTechnologyDefinition } from "./facilitated-payment.ts";
import { feednamiTechnologyDefinition } from "./feednami.ts";
import { fixerTechnologyDefinition } from "./fixer.ts";
import { frescoTechnologyDefinition } from "./fresco.ts";
import { genezioTechnologyDefinition } from "./genezio.ts";
import { hexiaTechnologyDefinition } from "./hexia.ts";
import { howlerJsTechnologyDefinition } from "./howler-js.ts";
import { htmxTechnologyDefinition } from "./htmx.ts";
import { intersectionObserverTechnologyDefinition } from "./intersection-observer.ts";
import { invokerCommandsTechnologyDefinition } from "./invoker-commands.ts";
import { kurocoTechnologyDefinition } from "./kuroco.ts";
import { moxieTechnologyDefinition } from "./moxie.ts";
import { pluploadTechnologyDefinition } from "./plupload.ts";
import { riotJsTechnologyDefinition } from "./riot-js.ts";
import { scalarTechnologyDefinition } from "./scalar.ts";
import { screenfullJsTechnologyDefinition } from "./screenfull-js.ts";
import { sheetyTechnologyDefinition } from "./sheety.ts";
import { sockjsTechnologyDefinition } from "./sockjs.ts";
import { usermediaElementTechnologyDefinition } from "./usermedia-element.ts";
import { x402TechnologyDefinition } from "./x402.ts";
import { apolloGraphqlTechnologyDefinition } from "./apollo-graphql.ts";
import { graphqlTechnologyDefinition } from "./graphql.ts";
import { relayTechnologyDefinition } from "./relay.ts";
import { urqlTechnologyDefinition } from "./urql.ts";
import { serverSentEventsTechnologyDefinition } from "./server-sent-events.ts";
import { trpcTechnologyDefinition } from "./trpc.ts";
import { websocketTechnologyDefinition } from "./websocket.ts";

/** Technology definitions in the api pattern category folder. */
export const apiPatternTechnologyDefinitions = [
	amplifyJsTechnologyDefinition,
	animeJsTechnologyDefinition,
	apiSpreadsheetsTechnologyDefinition,
	apiaryTechnologyDefinition,
	bowserTechnologyDefinition,
	connectionAllowlistsTechnologyDefinition,
	customizableSelectTechnologyDefinition,
	declarativeShadowDomSlotAssignmentTechnologyDefinition,
	dialogClosedbyTechnologyDefinition,
	dimpleTechnologyDefinition,
	facilitatedPaymentTechnologyDefinition,
	feednamiTechnologyDefinition,
	fixerTechnologyDefinition,
	frescoTechnologyDefinition,
	genezioTechnologyDefinition,
	hexiaTechnologyDefinition,
	howlerJsTechnologyDefinition,
	htmxTechnologyDefinition,
	intersectionObserverTechnologyDefinition,
	invokerCommandsTechnologyDefinition,
	kurocoTechnologyDefinition,
	moxieTechnologyDefinition,
	pluploadTechnologyDefinition,
	riotJsTechnologyDefinition,
	scalarTechnologyDefinition,
	screenfullJsTechnologyDefinition,
	sheetyTechnologyDefinition,
	sockjsTechnologyDefinition,
	usermediaElementTechnologyDefinition,
	x402TechnologyDefinition,
	apolloGraphqlTechnologyDefinition,
	graphqlTechnologyDefinition,
	relayTechnologyDefinition,
	urqlTechnologyDefinition,
	serverSentEventsTechnologyDefinition,
	trpcTechnologyDefinition,
	websocketTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
