---
title: Introducing Metamapper
author: Scott Cruwys
authorURL: https://github.com/scruwys
authorImageURL: https://gravatar.com/avatar/600347f12ab9f59f5a628ddf7e051ae1
---

Growing organizations rely heavily on data and analytics to drive decisions.

Luckily, it's never been easier to get data into your warehouse. The emergence of frameworks like [Apache Airflow](https://airflow.apache.org/docs/) and [Luigi](https://github.com/spotify/luigi) make it easier than ever to write custom pipelines to manage data ingestion. Companies like [Segment](https://segment.com/) and [Fivetran](https://fivetran.com/) even offer codeless solutions to sync data from your cloud applications (e.g., Salesforce, Zendesk) to your data warehouse.

But all of this data can come with a lot of noise.

Data context can be a big issue. It becomes difficult to keep track of things like business purpose, update frequency, and relevance as your data grows. In a perfect world, analysts would deprecate their tables and engineers would communicate system changes to downstream teams. But most know from experience that is rarely what happens.

We built [Metamapper](https://github.com/getmetamapper/metamapper) to solve this exact problem. Here's a bit how it works:

You connect your data warehouse(s) to Metamapper using readonly credentials. It crawls your database and compiles metadata about tables, views, columns, and other objects into a **[data catalog](https://www.metamapper.io/docs/metadata-management--schema-inspection)**.

**[Notes and annotations](https://www.metamapper.io/docs/metadata-management--annotations)** can be added to every object. This turns the documentation process into a collective effort. Business users can explore metadata, ask questions, and get answers. Notes are stored in perpetuity so that team members can find answers to the same question quickly in the future.

Every team is unique. And every database has different documentation requirements. Metamapper offers fully-configurable **[custom properties](https://www.metamapper.io/docs/metadata-management--custom-properties)** so you can classify your assets (useful for data audits), add data owners, link to external resources, and label whatever else you can think of.

It's not uncommon to have thousands of tables in your data warehouse. How can you ever find what you need in that sea of information? Well, Metamapper will index every table it has access to. This feeds into a **[powerful search engine](https://www.metamapper.io/docs/metadata-management--search)** that let's you quickly search across all of your connected databases for whatever you are looking for.

Metamapper is a powerful toolkit for teams that want to pursue a self service analytics model. You'll have a **single source of truth** about your data. A business user doesn't need to depend on the bandwidth of a data analyst – she can find the relevant tables using Metamapper and write her own queries against the data warehouse.

> Metamapper is 100% open source. Watch the [Github repository](https://github.com/getmetamapper/metamapper) for updates.
