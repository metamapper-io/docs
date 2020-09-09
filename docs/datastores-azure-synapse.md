---
id: datastores--azure-synapse
title: Azure Synapse
description: Connect and document Azure Synapse in minutes using Metamapper. This page contains a setup aond troubleshooting guide for Azure Synapse connections.
---

Metamapper supports [Azure Synapse Analytics](https://azure.microsoft.com/en-us/services/synapse-analytics/) as a connection source. Azure Synapse is an analytics service that brings together enterprise data warehousing and Big Data analytics.

This guide details how to setup and troubleshoot Azure Synapse in Metamapper.

## Prerequisites

* **A running Microsoft Azure Synapse Analytics instance.** Instructions for creating an Azure Synapse instance are outside the scope of this guide; it assume that you have an instance up and running. For help getting spinning up your own Azure Synapse instance, please refer to the [Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/).

* **Ability to view database connection details**. Metamapper specifically needs the following information:
    - IP or host
    - Username
    - Password
    - Port (default: 1143)
    - Database

* **Database privileges that allow you to create users and grant privileges.** This is required to create a database user for Metamapper.

## Choose connection method

There are two ways to connect your database.

### Direct Connection

A direct connection will work if Metamapper is in the same private network as your database. A direction connection will also work if your database is publicly accessible.

### SSH Tunnel

A jump host or SSH tunnel is required if your database is in a separate private network. This method uses a publicly accessible server to act as an intermediary between Metamapper and your database.

Check out [this guide](metadata-management--ssh-tunnels) on setting up a SSH tunnel to work with Metamapper.

## Create user

You will need to provide a user that Metamapper will use to periodically scan your database. We recommend creating a new user so that you can easily isolate Metamapper from the rest of your infrastructure.

```sql
CREATE LOGIN metamapper WITH PASSWORD = '<redacted>';
CREATE USER metamapper FOR LOGIN metamapper;
```

## Grant read access to user

Run the following stored procedure will grant the `metamapper` user read access to every object within your Azure Synapse instance.

```sql
EXEC sp_addrolemember 'db_datareader', 'metamapper'
```

Metamapper needs read access to the tables it wishes to sync. Metamapper will only read metadata _about_ your tables. It will never read the contents of your tables.

You can then [revoke access](https://docs.microsoft.com/en-us/sql/t-sql/statements/revoke-object-permissions-transact-sql) to a subset of tables or other database objects using statements similar to this:

```sql
REVOKE SELECT ON OBJECT::<schema>.<table> FROM metamapper;
```

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
