# Start with the user's first useful action

First state the customer's problem and the decision to enable. Write down the questions whose answers could change the
solution. Use [A01](../product/01-a01-start-from-the-product-question.md) to test the most useful unknown immediately
with the least setup. A browser invocation, API call, short user task or existing command can establish the first anchor
before a product scaffold exists. Keep the actual mechanism and explain what the isolated test cannot establish.

Write the journey before choosing files. For a hiring application, the journey can be: sign in, create a job, submit a
sample application, and open the uploaded résumé. If staff onboarding is part of the request, include invitation,
receipt of the message, password creation and sign-in. If an agent is the product's purpose, include one bounded task
that produces a visible result.

That journey defines the preview's required services. Email cannot be deferred when the only onboarding route needs an
email. A coding runner can be deferred when the first useful review is the application's project workflow. Record
optional capabilities explicitly. Do not reduce the agreed journey silently to make a deployment appear complete.

Name the person who will accept it and their access path. Establish the current account, secure credential retrieval or
consent step, and authorized test recipient before release. A stored bootstrap password is historical input; a later 401
does not authorize resetting a real account. Use the [agent execution controls](../agents/README.md) to carry this
contract across long sessions and parallel work.

When the requested outcome includes deployment, use two delivery passes after the relevant product questions have
been tested:

1. **Change to usable preview:** produce a reachable environment, run the journey, and give the reviewer its URL, access
   method and limitations.
2. **Reviewed preview to production:** select that candidate, validate the production plan and data compatibility,
   deploy, then verify the production journey and operating signals.

The small-batch principle is supported by [DORA](https://dora.dev/capabilities/working-in-small-batches/). The concrete
two-pass procedure is a Kaiju design. It must be measured and exercised in each target architecture.
