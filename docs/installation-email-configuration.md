---
id: installation--email-configuration
title: Email Configuration
---

There are occasions where Metamapper needs to send email notifications (user invites, password resets, alerts, etc.) to users. Metamapper uses Django's [core mail module](https://docs.djangoproject.com/en/3.0/topics/email/) to accomplish this.

## SMTP Configuration

You'll need to configure an SMTP provider for outbound email. It is recommended that you use some mail service, like [Amazon SES](https://aws.amazon.com/ses/) or [Sendgrid](https://sendgrid.com/), to send transactional emails.

The email backend defaults to `django.core.mail.backends.console.EmailBackend`, but can be overriding using environment variables.

| Environment Variable        | Description | Default Value            |
|-----------------------------|-------------|--------------------------|
| `METAMAPPER_EMAIL_BACKEND`  | The backend to use for sending emails. | [console.EmailBackend](https://docs.djangoproject.com/en/3.0/topics/email/#console-backend) |
| `METAMAPPER_EMAIL_HOST`     | The host to use for sending email. | localhost |
| `METAMAPPER_EMAIL_USER`     | Username to use for the SMTP server defined in `METAMAPPER_EMAIL_HOST`. | None |
| `METAMAPPER_EMAIL_PASSWORD` | The password to use for the SMTP server defined in `METAMAPPER_EMAIL_HOST`. | None |
| `METAMAPPER_EMAIL_PORT`     | Port to use for the SMTP server defined in `METAMAPPER_EMAIL_HOST`. | 25 |
| `METAMAPPER_EMAIL_USE_TLS`  | Whether to use a TLS (secure) connection when talking to the SMTP server. | False |
| `METAMAPPER_EMAIL_USE_SSL`  | Whether to use an implicit TLS (secure) connection when talking to the SMTP server. | False |


You need to set the value of `METAMAPPER_WEBSERVER_ORIGIN`, which is the base address of your Metamapper instance with the protocol, so for example: https://app.metamapper.io.

It's also recommended that you set `METAMAPPER_EMAIL_FROM_ADDRESS` to an email address that you are authorized to send from. This addressed will be used as the `From` and `Reply-To` for all email notifications.

## Sendgrid Example

Here's a quick example of how to configure Metamapper to send email via [Sendgrid](https://sendgrid.com/docs/for-developers/sending-email/django/) with a `.env` file:

```bash
METAMAPPER_EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
METAMAPPER_EMAIL_HOST='smtp.sendgrid.net'
METAMAPPER_EMAIL_USER= 'apikey'
METAMAPPER_EMAIL_PASSWORD='replace-with-your-sendgrid-api-key'
METAMAPPER_EMAIL_PORT=587
METAMAPPER_EMAIL_USE_TLS=True
```
