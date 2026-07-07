import type { TechnologyDefinition } from '../../types';
import { accertifyTechnologyDefinition } from './accertify';
import { adcaptchaTechnologyDefinition } from './adcaptcha';
import { akamaiBotManagerTechnologyDefinition } from './akamai-bot-manager';
import { akamaiWebApplicationProtectorTechnologyDefinition } from './akamai-web-application-protector';
import { alibabaCloudVerificationCodeTechnologyDefinition } from './alibaba-cloud-verification-code';
import { altchaTechnologyDefinition } from './altcha';
import { antibotCloudTechnologyDefinition } from './antibot-cloud';
import { anubisTechnologyDefinition } from './anubis';
import { apruvdTechnologyDefinition } from './apruvd';
import { arcaptchaTechnologyDefinition } from './arcaptcha';
import { arkoseLabsTechnologyDefinition } from './arkose-labs';
import { awsCertificateManagerTechnologyDefinition } from './aws-certificate-manager';
import { awsWafCaptchaTechnologyDefinition } from './aws-waf-captcha';
import { basicTechnologyDefinition } from './basic';
import { blankshieldTechnologyDefinition } from './blankshield';
import { blueTriangleTechnologyDefinition } from './blue-triangle';
import { botfaqtorTechnologyDefinition } from './botfaqtor';
import { bugcrowdTechnologyDefinition } from './bugcrowd';
import { buysafeTechnologyDefinition } from './buysafe';
import { cSideTechnologyDefinition } from './c-side';
import { captchMeTechnologyDefinition } from './captch-me';
import { cleantalkTechnologyDefinition } from './cleantalk';
import { clearTechnologyDefinition } from './clear';
import { clickceaseTechnologyDefinition } from './clickcease';
import { clickreportTechnologyDefinition } from './clickreport';
import { cloudflareBotManagementTechnologyDefinition } from './cloudflare-bot-management';
import { cloudflareTurnstileTechnologyDefinition } from './cloudflare-turnstile';
import { coinhaveTechnologyDefinition } from './coinhave';
import { coinhiveTechnologyDefinition } from './coinhive';
import { coinhiveCaptchaTechnologyDefinition } from './coinhive-captcha';
import { coinimpTechnologyDefinition } from './coinimp';
import { combahtonFlowshieldTechnologyDefinition } from './combahton-flowshield';
import { complyautoTechnologyDefinition } from './complyauto';
import { confiantTechnologyDefinition } from './confiant';
import { coveryTechnologyDefinition } from './covery';
import { cryptoLootTechnologyDefinition } from './crypto-loot';
import { datadomeTechnologyDefinition } from './datadome';
import { datagrailTechnologyDefinition } from './datagrail';
import { datashipsTechnologyDefinition } from './dataships';
import { ddosGuardTechnologyDefinition } from './ddos-guard';
import { deepminerTechnologyDefinition } from './deepminer';
import { detectifyTechnologyDefinition } from './detectify';
import { digestTechnologyDefinition } from './digest';
import { digicertTechnologyDefinition } from './digicert';
import { drataTechnologyDefinition } from './drata';
import { dutchisTechnologyDefinition } from './dutchis';
import { entrustTechnologyDefinition } from './entrust';
import { focusWebwallTechnologyDefinition } from './focus-webwall';
import { forterTechnologyDefinition } from './forter';
import { fortinetFortigateTechnologyDefinition } from './fortinet-fortigate';
import { fraudBlockerTechnologyDefinition } from './fraud-blocker';
import { fraudlabsProTechnologyDefinition } from './fraudlabs-pro';
import { friendlyCaptchaTechnologyDefinition } from './friendly-captcha';
import { fuguTechnologyDefinition } from './fugu';
import { funcaptchaTechnologyDefinition } from './funcaptcha';
import { geetestTechnologyDefinition } from './geetest';
import { hankoTechnologyDefinition } from './hanko';
import { hcaptchaTechnologyDefinition } from './hcaptcha';
import { hstsTechnologyDefinition } from './hsts';
import { hstsPreloadedTldTechnologyDefinition } from './hsts-preloaded-tld';
import { humanPresenceTechnologyDefinition } from './human-presence';
import { identrustTechnologyDefinition } from './identrust';
import { impervaTechnologyDefinition } from './imperva';
import { imunify360TechnologyDefinition } from './imunify360';
import { jscramblerTechnologyDefinition } from './jscrambler';
import { jsecoinTechnologyDefinition } from './jsecoin';
import { jumioTechnologyDefinition } from './jumio';
import { kasadaTechnologyDefinition } from './kasada';
import { kerberosTechnologyDefinition } from './kerberos';
import { keybaseTechnologyDefinition } from './keybase';
import { kiprotectTechnologyDefinition } from './kiprotect';
import { kondutoTechnologyDefinition } from './konduto';
import { letSEncryptTechnologyDefinition } from './let-s-encrypt';
import { mineroCcTechnologyDefinition } from './minero-cc';
import { metaContentSecurityPolicyTechnologyDefinition } from './meta-content-security-policy';
import { minerstatTechnologyDefinition } from './minerstat';
import { mollomTechnologyDefinition } from './mollom';
import { mtcaptchaTechnologyDefinition } from './mtcaptcha';
import { negateTechnologyDefinition } from './negate';
import { nexuspipeTechnologyDefinition } from './nexuspipe';
import { nofraudTechnologyDefinition } from './nofraud';
import { northwhistleTechnologyDefinition } from './northwhistle';
import { nortonShoppingGuaranteeTechnologyDefinition } from './norton-shopping-guarantee';
import { ntlmTechnologyDefinition } from './ntlm';
import { onfidoTechnologyDefinition } from './onfido';
import { perimeterxTechnologyDefinition } from './perimeterx';
import { picatchaTechnologyDefinition } from './picatcha';
import { preecoTechnologyDefinition } from './preeco';
import { priviqTechnologyDefinition } from './priviq';
import { proxmoxMailGatewayTechnologyDefinition } from './proxmox-mail-gateway';
import { rapidsecTechnologyDefinition } from './rapidsec';
import { reallySimpleSslAndSecurityTechnologyDefinition } from './really-simple-ssl-and-security';
import { recaptchaTechnologyDefinition } from './recaptcha';
import { regulaTechnologyDefinition } from './regula';
import { safebaseTechnologyDefinition } from './safebase';
import { sardineTechnologyDefinition } from './sardine';
import { sectigoTechnologyDefinition } from './sectigo';
import { securemetricsTechnologyDefinition } from './securemetrics';
import { securitiTechnologyDefinition } from './securiti';
import { seonTechnologyDefinition } from './seon';
import { sitelockTechnologyDefinition } from './sitelock';
import { skyflowTechnologyDefinition } from './skyflow';
import { sliderCaptchaTechnologyDefinition } from './slider-captcha';
import { snaphostTechnologyDefinition } from './snaphost';
import { solveMediaTechnologyDefinition } from './solve-media';
import { spnegoTechnologyDefinition } from './spnego';
import { sqreenTechnologyDefinition } from './sqreen';
import { startestTechnologyDefinition } from './startest';
import { testflowTechnologyDefinition } from './testflow';
import { thawteTechnologyDefinition } from './thawte';
import { threatmetrixTechnologyDefinition } from './threatmetrix';
import { tokenOfTrustTechnologyDefinition } from './token-of-trust';
import { trezorTechnologyDefinition } from './trezor';
import { truvalidateTechnologyDefinition } from './truvalidate';
import { v4guardCheckpointTechnologyDefinition } from './v4guard-checkpoint';
import { vantaTechnologyDefinition } from './vanta';
import { vaptchaTechnologyDefinition } from './vaptcha';
import { varitiTechnologyDefinition } from './variti';
import { ventryshieldTechnologyDefinition } from './ventryshield';
import { veryGoodSecurityTechnologyDefinition } from './very-good-security';
import { warPeTechnologyDefinition } from './war-pe';
import { yandexSmartcaptchaTechnologyDefinition } from './yandex-smartcaptcha';
import { featurePolicyTechnologyDefinition } from './feature-policy';
import { crossOriginResourcePolicyTechnologyDefinition } from './cross-origin-resource-policy';
import { referrerPolicyHeaderTechnologyDefinition } from './referrer-policy-header';
import { xFrameOptionsTechnologyDefinition } from './x-frame-options';
import { xContentTypeOptionsTechnologyDefinition } from './x-content-type-options';

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
