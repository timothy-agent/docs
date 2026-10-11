---
title: Identity and Bedrock
description: Give the gateway a cloud identity so Amazon Bedrock works without a stored key, on EKS and on other clouds.
sidebar:
  order: 5
assistant: false
---

Every provider in Timothy normally signs in with a key you store in the credential store. Amazon Bedrock can also sign in with the identity the cluster gives the gateway pod. Nothing is stored in Timothy then, and nothing expires.

Bedrock is the only provider with this option. The other providers use keys.

## How it works

The gateway service runs under its own Kubernetes service account, `<release>-gateway`. When you attach an AWS role to that service account, the AWS SDK inside the gateway finds the credentials on its own. You then create the Bedrock provider with the auth mode `ambient` instead of a credential, and the gateway signs each request with the role.

The chart attaches an identity through annotations on the service account. Only the gateway needs one. The other services never call a cloud API.

## On EKS

Two mechanisms work. Both end with the same values.

**IAM roles for service accounts (IRSA).** Create an IAM role with a trust policy for the cluster's OIDC provider and the service account `system:serviceaccount:timothy:timothy-gateway`, attach a policy that allows `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` on the models you want, and annotate the service account:

```yaml
gateway:
  serviceAccount:
    annotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/timothy-gateway
```

**EKS Pod Identity.** Install the Pod Identity agent add-on and create a pod identity association between the namespace, the service account `timothy-gateway` and the role. No annotation is needed.

Either way, the gateway pod receives the role's credentials from the SDK's default chain.

## Create the provider

The "Add a provider" form in [Settings, Providers](/docs/settings/providers/) asks for an access key pair. It has no switch for the cluster identity yet, so create the provider through the API. The option `auth` set to `ambient` tells the gateway to use the identity. Leave `credential_ref` out; a provider with both a credential and `auth: ambient` is rejected, and so is one without a region.

```sh
curl -X POST https://timothy.example.com/v1/admin/providers \
  -H "Authorization: Bearer $TIMOTHY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"bedrock","kind":"api","driver":"bedrock","enabled":true,"options":{"region":"eu-west-1","auth":"ambient"}}'
```

The provider then appears in Settings like any other, and you add it to routes there.

Verify the provider as you would any other. If the check fails with an access denied error, the role is attached but lacks the Bedrock permissions, or the model is not enabled in that region. If it fails with a missing credentials error, the role is not attached to the service account.

## On AKS and GKE

Those clusters give pods an Azure or Google identity, which Bedrock does not accept by itself. You have two choices.

**Store a key.** Create an IAM user in AWS with the Bedrock permissions, create an access key, and store it in Timothy as a credential. This is the Compose path and works everywhere. The downside is a long-lived key that you rotate yourself.

**Federate the cluster's identity into AWS.** AWS IAM can trust the cluster's OIDC issuer the same way EKS does. You create an IAM OIDC identity provider for the cluster's issuer URL, a role that trusts it for the gateway's service account, and then give the gateway pod a projected service account token plus two environment variables, `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE`. The SDK then exchanges the Kubernetes token for AWS credentials on every call.

The chart does not add the projected token volume or those variables yet. Add them with a Kustomize overlay or a post-render patch on the gateway Deployment, and watch for the issue in the Timothy repository that tracks a chart setting for it. On GKE the issuer URL is `https://container.googleapis.com/v1/projects/<project>/locations/<location>/clusters/<cluster>`. On AKS enable the OIDC issuer on the cluster (`--enable-oidc-issuer`) and read the URL with `az aks show --query oidcIssuerProfile.issuerUrl`.

## Other providers

OpenAI, Anthropic, Google AI and the rest sign in with a key you store in Timothy. A cloud identity does not help with them. Store the key the same way as on Compose, in [Settings, Credentials](/docs/settings/credentials/).
