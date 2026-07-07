import type { TechnologyDefinition } from '../../types';
import { allianceAuthTechnologyDefinition } from './alliance-auth';
import { amazonCognitoTechnologyDefinition } from './amazon-cognito';
import { apereoCasTechnologyDefinition } from './apereo-cas';
import { appleSignInTechnologyDefinition } from './apple-sign-in';
import { appliedCsr24TechnologyDefinition } from './applied-csr24';
import { auth0TechnologyDefinition } from './auth0';
import { auth0LockTechnologyDefinition } from './auth0-lock';
import { authorizedByTechnologyDefinition } from './authorized-by';
import { authyTechnologyDefinition } from './authy';
import { azureAdB2cTechnologyDefinition } from './azure-ad-b2c';
import { clerkTechnologyDefinition } from './clerk';
import { facebookLoginTechnologyDefinition } from './facebook-login';
import { getsocialTechnologyDefinition } from './getsocial';
import { googleSignInTechnologyDefinition } from './google-sign-in';
import { jumpcloudTechnologyDefinition } from './jumpcloud';
import { lineLoginTechnologyDefinition } from './line-login';
import { linkedinSignInTechnologyDefinition } from './linkedin-sign-in';
import { loginWithAmazonTechnologyDefinition } from './login-with-amazon';
import { loginradiusTechnologyDefinition } from './loginradius';
import { magiclabsTechnologyDefinition } from './magiclabs';
import { metamapTechnologyDefinition } from './metamap';
import { microsoftAuthenticationTechnologyDefinition } from './microsoft-authentication';
import { nextauthJsTechnologyDefinition } from './nextauth-js';
import { oktaTechnologyDefinition } from './okta';
import { oneallTechnologyDefinition } from './oneall';
import { oxiSocialLoginTechnologyDefinition } from './oxi-social-login';
import { passageTechnologyDefinition } from './passage';
import { passportJsTechnologyDefinition } from './passport-js';
import { ringcaptchaTechnologyDefinition } from './ringcaptcha';
import { sapCustomerDataCloudSignInTechnologyDefinition } from './sap-customer-data-cloud-sign-in';
import { simplesamlphpTechnologyDefinition } from './simplesamlphp';
import { socureTechnologyDefinition } from './socure';
import { superSocializerTechnologyDefinition } from './super-socializer';
import { twilioAuthyTechnologyDefinition } from './twilio-authy';
import { uloginTechnologyDefinition } from './ulogin';
import { userbaseTechnologyDefinition } from './userbase';
import { vouchedTechnologyDefinition } from './vouched';
import { wwpassTechnologyDefinition } from './wwpass';

export const authenticationIdentityTechnologyDefinitions = [
	allianceAuthTechnologyDefinition,
	amazonCognitoTechnologyDefinition,
	apereoCasTechnologyDefinition,
	appleSignInTechnologyDefinition,
	appliedCsr24TechnologyDefinition,
	auth0TechnologyDefinition,
	auth0LockTechnologyDefinition,
	authorizedByTechnologyDefinition,
	authyTechnologyDefinition,
	azureAdB2cTechnologyDefinition,
	clerkTechnologyDefinition,
	facebookLoginTechnologyDefinition,
	getsocialTechnologyDefinition,
	googleSignInTechnologyDefinition,
	jumpcloudTechnologyDefinition,
	lineLoginTechnologyDefinition,
	linkedinSignInTechnologyDefinition,
	loginWithAmazonTechnologyDefinition,
	loginradiusTechnologyDefinition,
	magiclabsTechnologyDefinition,
	metamapTechnologyDefinition,
	microsoftAuthenticationTechnologyDefinition,
	nextauthJsTechnologyDefinition,
	oktaTechnologyDefinition,
	oneallTechnologyDefinition,
	oxiSocialLoginTechnologyDefinition,
	passageTechnologyDefinition,
	passportJsTechnologyDefinition,
	ringcaptchaTechnologyDefinition,
	sapCustomerDataCloudSignInTechnologyDefinition,
	simplesamlphpTechnologyDefinition,
	socureTechnologyDefinition,
	superSocializerTechnologyDefinition,
	twilioAuthyTechnologyDefinition,
	uloginTechnologyDefinition,
	userbaseTechnologyDefinition,
	vouchedTechnologyDefinition,
	wwpassTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
