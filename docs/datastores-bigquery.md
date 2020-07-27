---
id: datastores--bigquery
title: Google BigQuery
description: TBD
---

Metamapper supports [Google BigQuery](https://cloud.google.com/bigquery/) as a connection source. BigQuery is a serverless, highly scalable, and cost-effective multi-cloud data warehouse designed for business agility.

This guide details how to setup and troubleshoot BigQuery in Metamapper.

## Prequisites

* **An existing Google Cloud Platform (GCP) project.** It must have billing enabled and an attached credit card.

* **An existing BigQuery instance in the GCP project.** Metamapper supports a single BigQuery instance per connection.

* **Permissions in the GCP project that allow you to create Identity Access Management (IAM) service accounts.** Metamapper uses an IAM service account to authenticate, which we will create later in this guide.

## Create a GCP IAM service account

Navigate to the [IAM Service Accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts) in the GCP console. Select the project that you want to use to access your BigQuery instance.

Next, click on **Create Service Account**. This is how we will generate the credentials you will input during the Metamapper datastore setup process.

![bigquery-service-account-1](/img/guides/bigquery-service-account-1.png)

When you create te service account, you will need to grant the account **BigQuery Metadata Viewer** permissions. Metamapper uses this to hit the BigQuery metadata API during the schema introspection process.

![bigquery-service-account-2](/img/guides/bigquery-service-account-2.png)

The last step is to create and download a JSON project key. The project key file contains information about the project, which Metamapper uses to authenticate during introspection.

![bigquery-service-account-3](/img/guides/bigquery-service-account-3.png)

Save the JSON project key file to your computer. You will need to copy and paste the raw JSON into the **Credentials** field when you set up your datastore connection in Metamapper.

![bigquery-service-account-4](/img/guides/bigquery-service-account-4.png)

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
