---
id: installation--healthchecks
title: Healthchecks
---

To check the health status of your Metamapper instance, you can simply access the endpoint `/health`. It will return the following JSON object:


```json
{
    "metastore": {
        "status": "healthly"
    },
    "scheduler": {
        "status": "healthy",
        "latest_scheduler_heartbeat": "2020-07-21 05:23:19+00:00"
    },
    "worker": {
        "status": "healthly"
    }
}
```

The `status` of each component can be `healthy` or `unhealthy`.


### Metastore

The status of `metastore` depends on whether a valid connection could be made to the database.

### Scheduler

The status of `scheduler` depends on when the latest scheduler heartbeat was received.

Every 30 seconds, the beat scheduler updates a database record with the current timestamp. If the last heatbeat was received more than 60 seconds ago, we consider the scheduler unhealthy.

### Worker

The status of `worker` is determined by sending a small task through the `default` queue and confirming that it was processed via the [result_backend](https://docs.celeryproject.org/en/stable/userguide/configuration.html#std:setting-result_backend).

If you have decided to not configure the `result_backend` or are using a broker that does not support the `result_backend` (such as Amazon SQS), the status will be set to `not_configured`.

### Webserver

If the healthcheck endpoint does not return a `200 - OK` status code, you can assume that the webserver and GraphQL endpoints are unhealthy.
