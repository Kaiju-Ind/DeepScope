# Resend and the complete email journey

**Inputs and owner.** Domain administration owns DNS and sender verification. Application owners select the supported
API or SMTP integration, sender, reply destination and all sending processes. The tester supplies an approved recipient.
Provider credentials remain secret references.

Use the native Resend API integration when the application supports it. For an SMTP-only application on Bunny, select a
provider-supported port compatible with that runtime. Bunny restricts **25, 465, 587 and 2525** by default. Resend
documents **2587 for STARTTLS** and **2465 for implicit TLS**. The recommended SMTP starting point here is
`smtp.resend.com:2587` with required STARTTLS, followed by an actual-runtime test. A port absent from the restriction
list is not a connectivity guarantee. [Bunny limits](https://bunny.net/docs/magic-containers/limits);
[Resend SMTP](https://resend.com/features/smtp-service).

**Procedure.**

1. Verify the intended sending domain and exact From identity. Do not confuse a verified root domain with separately
   configured sending-subdomain readiness. [Resend domains](https://resend.com/docs/dashboard/domains/introduction).
2. Trace the application's real settings and every sender: web/API account messages, background notifications and
   scheduled work. Configure the actual supported API or SMTP fields. For SMTP, match the selected port to STARTTLS or
   implicit TLS and require encryption.
3. Check connectivity/authentication from each deployed process role. The inspected OpenATS default remains port587, so
   a Bunny instance must deliberately select the compatible tested setting. ItsAPlan configures email through its
   application administration interface; copying OpenATS environment variables would be incorrect.
   [OpenATS settings](https://github.com/Kaiju-Ind/OpenATS/blob/3b30f7e34a16dca68fe1ac354438ea93ef6fad26/infra/config.ts);
   [ItsAPlan first-use setup](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/deployment.md).
4. Trigger the intended invitation or notification to the approved test recipient. Correlate the application job with
   the provider message ID. Separate provider acceptance, reported delivery and mailbox receipt; then follow the link
   and complete the user action.
5. If replies matter, send a test reply and verify the actual mailbox or inbound workflow. Outbound sending does not
   establish reply handling. Configure authenticated delivery-event handling when the application needs it.
   [Resend webhook capabilities](https://resend.com/docs/webhooks/introduction).

Record the exact test action, sending process, intended recipient, consent and allowed side effect before sending. Do
not substitute a generic message to a group address for a failing staff invitation. A sending-only key may be unable to
read delivery events; use the approved evidence route rather than broadening its scope automatically. Trace account
persistence and the installed auth library's callback/error handling so an account saved before a send failure can be
retried without duplication. Preserve generic public password-reset semantics.

**Evidence and acceptance.** Retain non-secret sender identity, transport/port/TLS mode, process roles, message ID,
delivery/receipt evidence and successful user action. Email-dependent onboarding blocks P03 until this journey passes.

**Repeat and recovery.** First installation proves sender, transport and journey. Each relevant deployment checks
configuration and the affected sending path. Domain/DNS, key, transport, container placement, library or sender-process
changes invalidate prior proof. Diagnose connection, TLS, authentication, sender policy, queue, acceptance and delivery
separately. Inspect the prior message/job before retrying an ambiguous send; avoid duplicate invitations and credential
rotation without evidence.
