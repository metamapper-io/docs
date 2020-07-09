---
id: installation--asynchronous-workers
title: Asynchronous Workers
---

Metamapper uses a queue-based architecture to process certain load-intensive tasks asynchronously. For example, schema inspection tasks are queued periodically and processed via background workers so that user experience is not negatively impacted.

Metamapper uses [Celery](https://docs.celeryproject.org/en/stable/) to schedule periodic tasks and manage workers.

## Running a Worker

Workers can be started like any other Celery application:

```bash
$ celery worker --app metamapper -l info
```

If you installed Metamapper using the [suggested Docker setup](https://github.com/getmetamapper/metamapper-setup), this is synonymous to running the following [docker-entrypoint](https://github.com/getmetamapper/metamapper/blob/master/bin/docker-entrypoint) command:

```bash
$ docker run --env-file .env metamapper/metamapper:latest worker
```

We recommend that you run multiple workers to ensure timely processing of tasks.

## Configuring the Broker

Metamapper uses [config_from_envvar](https://docs.celeryproject.org/en/stable/userguide/application.html#config-from-envvar) to configure different aspects of Celery. Refer to the [Advanced Configuration](installation--configuring-metamapper#celery) section to see how to override the default settings.

Any of the three [stable brokers](https://docs.celeryproject.org/en/latest/getting-started/brokers/) mentioned in the Celery documentation are currently supported.

### Redis

Redis should work as a broker in the vast majority of instances, which is why we recommend it as the default message broker.

```python
broker_url = "redis://localhost:6379/0"
```

### RabbitMQ

For handling high traffic workloads, we recommend using RabbitMQ as the broker.

```python
broker_url = "amqp://guest:guest@localhost:5672/metamapper"
```

### SQS

You can also use [Amazon SQS](https://aws.amazon.com/sqs/) as a broker. Please note that SQS has not been actively tested by our development team.

One known limitation of SQS and Celery is there is [no supported results backend](https://docs.celeryproject.org/en/stable/getting-started/brokers/sqs.html#results). However, Metamapper does not rely on the results backend, so it should (in theory) behave properly.

```python
broker_url = "sqs://"
```
## Starting the Scheduler

Metamapper relies on scheduled tasks to operate. For example, Metamapper inspects connected datastores every hour to check for schema changes. This periodic task scheduling is handled via the scheduler process.

You can start the scheduler using the following command:

```bash
$ celery beat --app metamapper -l info
```

If you installed Metamapper using the [suggested Docker setup](https://github.com/getmetamapper/metamapper-setup), this is synonymous to running the following [docker-entrypoint](https://github.com/getmetamapper/metamapper/blob/master/bin/docker-entrypoint) command:

```bash
$ docker run --env-file .env metamapper/metamapper:latest scheduler
```
