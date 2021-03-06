---
id: metadata-management
title: Welcome
description: Learn how to setup and use Metamapper, configure Metamapper to read from your datastores, and contribute to the open source project on GitHub
---

Welcome to the Metamapper documentation.

This guide covers the product, how to use it, and self-hosted Metamapper. If you can't find what you are looking for in on this site, please ask us anything in the [Discord channel](http://discuss.metamapper.io).

## What is Metamapper?

Metamapper is an open-source metadata management platform that aims to make it easier to share data and its context across your organization. It depends on a simple concept: data teams spend much of their time in databases, data warehouses, and data lakes.

These datastores serve the source of truth for analytics within an organization. But as companies grow, so does their data. With all of this data comes a lot of noise. Teams can't communicate every aspect of their operations to each other. It becomes difficult to keep track of context around data, how "fresh" it is, and if it is even meant for you to use.

That's where Metamapper comes in. Users can connect their datastores and Metamapper will periodically scan and index on any data assets it finds. Everything is searchable. And pretty much anything can be annotated with business context or whatever other custom information you think might be helpful to your organization.

Think of it as Google for your data warehouse – just search and it'll find the data that best fits your needs.

## Use Cases

Here are a few common use cases for Metamapper.

**Data democratization** – Connect your data warehouse to Metamapper and it will create and maintain a catalog of all the data assets inside. Your team can [search](metadata-management--search) for tables, ask questions, and see what others have said about available data points.

**Data privacy and classification** – Use [custom fields](metadata-management--custom-properties) to classify data assets for audits or compliance purposes. Custom fields are super flexible, so you can mark personally identifiable information (PII) or any other categorization you can think of. That way your team can see how and why data is classified a certain way and stay in compliance.

**Data lineage and quality** – Use Metamapper to document when data assets are updated, what processes updates them, what tables and fields are deprecated, etc. This can prevent your team from making decisions based on outdated or wrong information. It also helps your Data Engineering track and stay on top of this sort of deprecation work.

## Quickstart

> We recommend using the [official Docker bootstrap](https://github.com/getmetamapper/metamapper-setup) for production deployments.

You can try out a default version of Metamapper with sample data using [Docker](https://docs.docker.com/get-docker/) and [Docker-Compose](https://docs.docker.com/compose/install/).

Clone the repository:

```
git clone git@github.com:getmetamapper/metamapper.git
```

From the repository root:

```
docker-compose -f docker-quickstart.yml up
```

Head to [http://localhost:5555](http://localhost:5555) to view the Metamapper UI:

![quickstart-gif](/img/quickstart.gif)

## Useful Links

Here are some links and guides to get you started:

- Installing Metamapper? See the [Installation](installation) guide.
- Just started using to Metamapper? This [guide](metadata-management--getting-started) is a good place to start.
- Stuck? Ask a question on the [discussion board](http://discuss.metamapper.io).
- Looking to contribute to Metamapper? Read the [CONTRIBUTING.md](https://github.com/getmetamapper/metamapper/blob/master/CONTRIBUTING.md).
