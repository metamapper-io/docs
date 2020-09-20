---
id: datastores--overview
title: Overview
---

This section of the documentation contains helpful guides for setting up and troubleshooting datastores in Metamapper.

## Supported Datastores

Metamapper currently supports automatic crawling and indexing of these database management systems with plans to add more in the near future.

- [Amazon Redshift](https://aws.amazon.com/redshift/)
- [AWS Athena](https://aws.amazon.com/athena/)
- [AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/populate-data-catalog.html)
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/)
- [Azure Synapse](https://azure.microsoft.com/en-us/services/synapse-analytics/)
- [Google BigQuery](https://cloud.google.com/bigquery)
- [Hive Metastore](https://hive.apache.org/)
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)
- [MySQL](https://www.mysql.com/)
- [Oracle](https://www.oracle.com/database/)
- [PostgreSQL](https://www.postgresql.org/)
- [Snowflake](https://www.snowflake.com/)

## Safety

The Metamapper team wants to minimize the impact Metamapper has on your databases.

It can make sense to connect Metamapper to a read-replica so that you can isolate syncing from your production workloads. But some databases (e.g., Snowflake and Redshift) do not have support replicas.

That is why the database connectors are designed to have the lowest possible computational footprint. We accomplish this by having the entire sync process operate off a single query that we cache and use in downstream processes. This means we are most issuing a single query to your database per scheduled run.

## Open Source

Metamapper is an [open source project](https://github.com/getmetamapper/metamapper). The database connectors it uses are [publicly available](https://github.com/getmetamapper/metamapper/tree/master/app/inspector/engines).

Don't see your datastore on this list? Pull requests (or even just a [feature request](https://github.com/getmetamapper/metamapper/issues/new/choose)) are always appreciated.
