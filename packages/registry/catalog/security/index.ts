import type { TechnologyDefinition } from "../../types.ts";
import { accertifyTechnologyDefinition } from "./accertify.ts";
import { adcaptchaTechnologyDefinition } from "./adcaptcha.ts";
import { akamaiBotManagerTechnologyDefinition } from "./akamai-bot-manager.ts";
import { akamaiWebApplicationProtectorTechnologyDefinition } from "./akamai-web-application-protector.ts";
import { alibabaCloudVerificationCodeTechnologyDefinition } from "./alibaba-cloud-verification-code.ts";
import { altchaTechnologyDefinition } from "./altcha.ts";
import { antibotCloudTechnologyDefinition } from "./antibot-cloud.ts";
import { anubisTechnologyDefinition } from "./anubis.ts";
import { apruvdTechnologyDefinition } from "./apruvd.ts";
import { arcaptchaTechnologyDefinition } from "./arcaptcha.ts";
import { arkoseLabsTechnologyDefinition } from "./arkose-labs.ts";
import { awsCertificateManagerTechnologyDefinition } from "./aws-certificate-manager.ts";
import { awsWafCaptchaTechnologyDefinition } from "./aws-waf-captcha.ts";
import { basicTechnologyDefinition } from "./basic.ts";
import { blankshieldTechnologyDefinition } from "./blankshield.ts";
import { blueTriangleTechnologyDefinition } from "./blue-triangle.ts";
import { botfaqtorTechnologyDefinition } from "./botfaqtor.ts";
import { bugcrowdTechnologyDefinition } from "./bugcrowd.ts";
import { buysafeTechnologyDefinition } from "./buysafe.ts";
import { cSideTechnologyDefinition } from "./c-side.ts";
import { captchMeTechnologyDefinition } from "./captch-me.ts";
import { cleantalkTechnologyDefinition } from "./cleantalk.ts";
import { clearTechnologyDefinition } from "./clear.ts";
import { clickceaseTechnologyDefinition } from "./clickcease.ts";
import { clickreportTechnologyDefinition } from "./clickreport.ts";
import { cloudflareBotManagementTechnologyDefinition } from "./cloudflare-bot-management.ts";
import { cloudflareTurnstileTechnologyDefinition } from "./cloudflare-turnstile.ts";
import { coinhaveTechnologyDefinition } from "./coinhave.ts";
import { coinhiveTechnologyDefinition } from "./coinhive.ts";
import { coinhiveCaptchaTechnologyDefinition } from "./coinhive-captcha.ts";
import { coinimpTechnologyDefinition } from "./coinimp.ts";
import { combahtonFlowshieldTechnologyDefinition } from "./combahton-flowshield.ts";
import { complyautoTechnologyDefinition } from "./complyauto.ts";
import { confiantTechnologyDefinition } from "./confiant.ts";
import { coveryTechnologyDefinition } from "./covery.ts";
import { cryptoLootTechnologyDefinition } from "./crypto-loot.ts";
import { datadomeTechnologyDefinition } from "./datadome.ts";
import { datagrailTechnologyDefinition } from "./datagrail.ts";
import { datashipsTechnologyDefinition } from "./dataships.ts";
import { ddosGuardTechnologyDefinition } from "./ddos-guard.ts";
import { deepminerTechnologyDefinition } from "./deepminer.ts";
import { detectifyTechnologyDefinition } from "./detectify.ts";
import { digestTechnologyDefinition } from "./digest.ts";
import { digicertTechnologyDefinition } from "./digicert.ts";
import { drataTechnologyDefinition } from "./drata.ts";
import { dutchisTechnologyDefinition } from "./dutchis.ts";
import { entrustTechnologyDefinition } from "./entrust.ts";
import { focusWebwallTechnologyDefinition } from "./focus-webwall.ts";
import { forterTechnologyDefinition } from "./forter.ts";
import { fortinetFortigateTechnologyDefinition } from "./fortinet-fortigate.ts";
import { fraudBlockerTechnologyDefinition } from "./fraud-blocker.ts";
import { fraudlabsProTechnologyDefinition } from "./fraudlabs-pro.ts";
import { friendlyCaptchaTechnologyDefinition } from "./friendly-captcha.ts";
import { fuguTechnologyDefinition } from "./fugu.ts";
import { funcaptchaTechnologyDefinition } from "./funcaptcha.ts";
import { geetestTechnologyDefinition } from "./geetest.ts";
import { hankoTechnologyDefinition } from "./hanko.ts";
import { hcaptchaTechnologyDefinition } from "./hcaptcha.ts";
import { hstsTechnologyDefinition } from "./hsts.ts";
import { hstsPreloadedTldTechnologyDefinition } from "./hsts-preloaded-tld.ts";
import { humanPresenceTechnologyDefinition } from "./human-presence.ts";
import { identrustTechnologyDefinition } from "./identrust.ts";
import { impervaTechnologyDefinition } from "./imperva.ts";
import { imunify360TechnologyDefinition } from "./imunify360.ts";
import { jscramblerTechnologyDefinition } from "./jscrambler.ts";
import { jsecoinTechnologyDefinition } from "./jsecoin.ts";
import { jumioTechnologyDefinition } from "./jumio.ts";
import { kasadaTechnologyDefinition } from "./kasada.ts";
import { kerberosTechnologyDefinition } from "./kerberos.ts";
import { keybaseTechnologyDefinition } from "./keybase.ts";
import { kiprotectTechnologyDefinition } from "./kiprotect.ts";
import { kondutoTechnologyDefinition } from "./konduto.ts";
import { letSEncryptTechnologyDefinition } from "./let-s-encrypt.ts";
import { mineroCcTechnologyDefinition } from "./minero-cc.ts";
import { metaContentSecurityPolicyTechnologyDefinition } from "./meta-content-security-policy.ts";
import { minerstatTechnologyDefinition } from "./minerstat.ts";
import { mollomTechnologyDefinition } from "./mollom.ts";
import { mtcaptchaTechnologyDefinition } from "./mtcaptcha.ts";
import { negateTechnologyDefinition } from "./negate.ts";
import { nexuspipeTechnologyDefinition } from "./nexuspipe.ts";
import { nofraudTechnologyDefinition } from "./nofraud.ts";
import { northwhistleTechnologyDefinition } from "./northwhistle.ts";
import { nortonShoppingGuaranteeTechnologyDefinition } from "./norton-shopping-guarantee.ts";
import { ntlmTechnologyDefinition } from "./ntlm.ts";
import { onfidoTechnologyDefinition } from "./onfido.ts";
import { perimeterxTechnologyDefinition } from "./perimeterx.ts";
import { picatchaTechnologyDefinition } from "./picatcha.ts";
import { preecoTechnologyDefinition } from "./preeco.ts";
import { priviqTechnologyDefinition } from "./priviq.ts";
import { proxmoxMailGatewayTechnologyDefinition } from "./proxmox-mail-gateway.ts";
import { rapidsecTechnologyDefinition } from "./rapidsec.ts";
import { reallySimpleSslAndSecurityTechnologyDefinition } from "./really-simple-ssl-and-security.ts";
import { recaptchaTechnologyDefinition } from "./recaptcha.ts";
import { regulaTechnologyDefinition } from "./regula.ts";
import { safebaseTechnologyDefinition } from "./safebase.ts";
import { sardineTechnologyDefinition } from "./sardine.ts";
import { sectigoTechnologyDefinition } from "./sectigo.ts";
import { securemetricsTechnologyDefinition } from "./securemetrics.ts";
import { securitiTechnologyDefinition } from "./securiti.ts";
import { seonTechnologyDefinition } from "./seon.ts";
import { sitelockTechnologyDefinition } from "./sitelock.ts";
import { skyflowTechnologyDefinition } from "./skyflow.ts";
import { sliderCaptchaTechnologyDefinition } from "./slider-captcha.ts";
import { snaphostTechnologyDefinition } from "./snaphost.ts";
import { solveMediaTechnologyDefinition } from "./solve-media.ts";
import { spnegoTechnologyDefinition } from "./spnego.ts";
import { sqreenTechnologyDefinition } from "./sqreen.ts";
import { startestTechnologyDefinition } from "./startest.ts";
import { testflowTechnologyDefinition } from "./testflow.ts";
import { thawteTechnologyDefinition } from "./thawte.ts";
import { threatmetrixTechnologyDefinition } from "./threatmetrix.ts";
import { tokenOfTrustTechnologyDefinition } from "./token-of-trust.ts";
import { trezorTechnologyDefinition } from "./trezor.ts";
import { truvalidateTechnologyDefinition } from "./truvalidate.ts";
import { v4guardCheckpointTechnologyDefinition } from "./v4guard-checkpoint.ts";
import { vantaTechnologyDefinition } from "./vanta.ts";
import { vaptchaTechnologyDefinition } from "./vaptcha.ts";
import { varitiTechnologyDefinition } from "./variti.ts";
import { ventryshieldTechnologyDefinition } from "./ventryshield.ts";
import { veryGoodSecurityTechnologyDefinition } from "./very-good-security.ts";
import { warPeTechnologyDefinition } from "./war-pe.ts";
import { yandexSmartcaptchaTechnologyDefinition } from "./yandex-smartcaptcha.ts";
import { featurePolicyTechnologyDefinition } from "./feature-policy.ts";
import { crossOriginResourcePolicyTechnologyDefinition } from "./cross-origin-resource-policy.ts";
import { referrerPolicyHeaderTechnologyDefinition } from "./referrer-policy-header.ts";
import { xFrameOptionsTechnologyDefinition } from "./x-frame-options.ts";
import { xContentTypeOptionsTechnologyDefinition } from "./x-content-type-options.ts";

export const securityTechnologyDefinitions = [
	accertifyTechnologyDefinition,
	adcaptchaTechnologyDefinition,
	akamaiBotManagerTechnologyDefinition,
	akamaiWebApplicationProtectorTechnologyDefinition,
	alibabaCloudVerificationCodeTechnologyDefinition,
	altchaTechnologyDefinition,
	antibotCloudTechnologyDefinition,
	anubisTechnologyDefinition,
	apruvdTechnologyDefinition,
	arcaptchaTechnologyDefinition,
	arkoseLabsTechnologyDefinition,
	awsCertificateManagerTechnologyDefinition,
	awsWafCaptchaTechnologyDefinition,
	basicTechnologyDefinition,
	blankshieldTechnologyDefinition,
	blueTriangleTechnologyDefinition,
	botfaqtorTechnologyDefinition,
	bugcrowdTechnologyDefinition,
	buysafeTechnologyDefinition,
	cSideTechnologyDefinition,
	captchMeTechnologyDefinition,
	cleantalkTechnologyDefinition,
	clearTechnologyDefinition,
	clickceaseTechnologyDefinition,
	clickreportTechnologyDefinition,
	cloudflareBotManagementTechnologyDefinition,
	cloudflareTurnstileTechnologyDefinition,
	coinhaveTechnologyDefinition,
	coinhiveTechnologyDefinition,
	coinhiveCaptchaTechnologyDefinition,
	coinimpTechnologyDefinition,
	combahtonFlowshieldTechnologyDefinition,
	complyautoTechnologyDefinition,
	confiantTechnologyDefinition,
	coveryTechnologyDefinition,
	cryptoLootTechnologyDefinition,
	datadomeTechnologyDefinition,
	datagrailTechnologyDefinition,
	datashipsTechnologyDefinition,
	ddosGuardTechnologyDefinition,
	deepminerTechnologyDefinition,
	detectifyTechnologyDefinition,
	digestTechnologyDefinition,
	digicertTechnologyDefinition,
	drataTechnologyDefinition,
	dutchisTechnologyDefinition,
	entrustTechnologyDefinition,
	focusWebwallTechnologyDefinition,
	forterTechnologyDefinition,
	fortinetFortigateTechnologyDefinition,
	fraudBlockerTechnologyDefinition,
	fraudlabsProTechnologyDefinition,
	friendlyCaptchaTechnologyDefinition,
	fuguTechnologyDefinition,
	funcaptchaTechnologyDefinition,
	geetestTechnologyDefinition,
	hankoTechnologyDefinition,
	hcaptchaTechnologyDefinition,
	hstsTechnologyDefinition,
	hstsPreloadedTldTechnologyDefinition,
	humanPresenceTechnologyDefinition,
	identrustTechnologyDefinition,
	impervaTechnologyDefinition,
	imunify360TechnologyDefinition,
	jscramblerTechnologyDefinition,
	jsecoinTechnologyDefinition,
	jumioTechnologyDefinition,
	kasadaTechnologyDefinition,
	kerberosTechnologyDefinition,
	keybaseTechnologyDefinition,
	kiprotectTechnologyDefinition,
	kondutoTechnologyDefinition,
	letSEncryptTechnologyDefinition,
	mineroCcTechnologyDefinition,
	metaContentSecurityPolicyTechnologyDefinition,
	minerstatTechnologyDefinition,
	mollomTechnologyDefinition,
	mtcaptchaTechnologyDefinition,
	negateTechnologyDefinition,
	nexuspipeTechnologyDefinition,
	nofraudTechnologyDefinition,
	northwhistleTechnologyDefinition,
	nortonShoppingGuaranteeTechnologyDefinition,
	ntlmTechnologyDefinition,
	onfidoTechnologyDefinition,
	perimeterxTechnologyDefinition,
	picatchaTechnologyDefinition,
	preecoTechnologyDefinition,
	priviqTechnologyDefinition,
	proxmoxMailGatewayTechnologyDefinition,
	rapidsecTechnologyDefinition,
	reallySimpleSslAndSecurityTechnologyDefinition,
	recaptchaTechnologyDefinition,
	regulaTechnologyDefinition,
	safebaseTechnologyDefinition,
	sardineTechnologyDefinition,
	sectigoTechnologyDefinition,
	securemetricsTechnologyDefinition,
	securitiTechnologyDefinition,
	seonTechnologyDefinition,
	sitelockTechnologyDefinition,
	skyflowTechnologyDefinition,
	sliderCaptchaTechnologyDefinition,
	snaphostTechnologyDefinition,
	solveMediaTechnologyDefinition,
	spnegoTechnologyDefinition,
	sqreenTechnologyDefinition,
	startestTechnologyDefinition,
	testflowTechnologyDefinition,
	thawteTechnologyDefinition,
	threatmetrixTechnologyDefinition,
	tokenOfTrustTechnologyDefinition,
	trezorTechnologyDefinition,
	truvalidateTechnologyDefinition,
	v4guardCheckpointTechnologyDefinition,
	vantaTechnologyDefinition,
	vaptchaTechnologyDefinition,
	varitiTechnologyDefinition,
	ventryshieldTechnologyDefinition,
	veryGoodSecurityTechnologyDefinition,
	warPeTechnologyDefinition,
	yandexSmartcaptchaTechnologyDefinition,
	featurePolicyTechnologyDefinition,
	crossOriginResourcePolicyTechnologyDefinition,
	referrerPolicyHeaderTechnologyDefinition,
	xFrameOptionsTechnologyDefinition,
	xContentTypeOptionsTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
