---
id: workspace-management--sso-introduction
title: Single Sign-On (SSO)
---

Single Sign-On (or SSO) allows you to manage workspace membership via a third-party identity provider.

## Getting Started

Metamapper enables SSO through a concept called connections. You can create a new connection by going to **Workspace Settings > Authentication** and clicking **Add New Connection**.

Metamapper supports the following providers (click the link to go to it's setup guide):

- [Google for Work](workspace-management--sso-google)
- [Github Organizations](workspace-management--sso-github)
- [Generic SAML2.0 authentication](workspace-management--sso-saml2)

> If you are using self hosted Metamapper, you will need to [update your configuration](installation--security#oauth-authentication) to setup Google or Github authentication.

## Default Role

Metamapper uses just-in-time provisioning – when a user signs in via SSO, an account will be automatically created if it does not already exist. Note that you can connect multiple third-party providers to the same email address.

You can choose the default workspace [permission level](workspace-management--access-mgmt#permissions) you wish to grant provisioned users when you set up each individual connection. We suggest setting this to minimal access (readonly) but allow you to customize this based on your use case.

## Domain Verification

Metmapper only supports SSO for domains that you own. You must verify domain(s) ownership before you can continue using any of the available providers.

We only support verification through DNS validation. You can initiate this process by going to **Workspace Settings > Authentication** and filling out the domain verification form. If the domain is not already claimed and verified, you will be provided a TXT record that you can add through your DNS provider.

> These records are checked continously, so do not remove this record from your DNS manager.

![sso-domain-verification](/img/guides/sso-domain-verification.png)

## Choosing a Default Connection

Metamapper supports automatic SSO detection and redirection during the sign in process. In other words, when a user enters her or his email address, the system will:

1. Parse the domain from the email address.
2. Find the SSO connection, if it exists.
3. Authenticate the user against the SSO provider.
4. If successful, redirect them to the home page.

To enable this functionality, you must set the default connection in the **Workspace Settings > Authentication** section.

## Available Providers

### Google for Work

The Google for Work integration will authenticate you against your Google account.

Once connected, Metamapper will provision team members restricted to the domain connected to the Google for Work account.

### Github Organizations

The Github integration will authenticate against your Github account. You will need to choose an [organization](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations) to connect to the workspace.

Once connected, Metamapper will auto-provision users that have access to the Github organization.

### Generic SAML2.0

Metamapper supports SAML2.0 based authentication which may be configured manually using the generic SAML2.0 provider.

We have set up connections with [Auth0](https://auth0.com/) and [Okta](https://www.okta.com/) in the past, so most authentication providers should be configurable using this method.



