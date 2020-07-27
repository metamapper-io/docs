---
id: datastores--sql-server
title: Microsoft SQL Server
description: Connect and document Microsoft SQL Server in minutes using Metamapper. This page contains a setup aond troubleshooting guide for SQL Server connections.
---

Metamapper supports [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2019) as a connection source. SQL Server is a relational database management system developed by Microsoft. This guide also applies for connections to [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/), which is powered by the same engine.

This guide details how to setup and troubleshoot SQL Server in Metamapper.

## Prerequisites

* **A running Microsoft SQL Server instance.** Instructions for creating a SQL Server database are outside the scope of this guide; it assume that you have an instance up and running. For help getting spinning up your own SQL Server instance, please refer to your cloud provider's documentation.

* **Ability to view database connection details**. Metamapper specifically needs the following information:

    - IP or host
    - Username
    - Password
    - Port (default: 1433)
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

Run the following stored procedure will grant the `metamapper` user read access to every object within your SQL Server database.

```sql
USE <database>
EXEC sp_addrolemember 'db_datareader', 'metamapper'
```

Metamapper needs read access to the tables it wishes to sync. Metamapper will only read metadata _about_ your tables. It will never read the contents of your tables.

You can then [revoke access](https://docs.microsoft.com/en-us/sql/t-sql/statements/revoke-object-permissions-transact-sql) to a subset of tables or other database objects using statements similar to this:

```sql
USE <database>
REVOKE SELECT ON OBJECT::<schema>.<table> FROM metamapper;
```

## Questions? Feedback?

Did this article help? If you have questions or feedback, feel free to [submit a pull request](https://github.com/getmetamapper/documentation) with your recommendations, [open a Github issue](https://github.com/getmetamapper/documentation/issues/new), or [join the discussion](http://discuss.metamapper.io) on Discord.
