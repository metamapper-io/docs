---
id: installation--search
title: Search
---

Search is an integral part of Metamapper. Once your datastore schema is crawled and saved in the metastore, it should also be indexed via some sort of search engine. Once indexed, your users will be able to discover data assets with simple search queries.

## Configuring the Backend

You can configure the search backend by referencing the full Python class path in the `METAMAPPER_SEARCH_BACKEND` environment variable.

By default, Metamapper uses [Elasticsearch](https://www.elastic.co/) for powering search of data assets.

Right now Metapper doesn't require any special features of Elasticsearch so your own [container instance](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) or [managed service](https://aws.amazon.com/elasticsearch-service/) will work just fine.


You can set the Elasticsearch instance URL using the `METAMAPPER_ELASTIC_URL` environment variable. [Connection specific arguments](https://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch.Elasticsearch) are provided by overriding `ELASTIC_CLIENT_KWARGS` in [settings.py](https://github.com/getmetamapper/metamapper/blob/master/metamapper/settings.py). For Metamapper and Elasticsearch containers running with docker-compose it would look something like this:

```bash
METAMAPPER_ELASTIC_URL='http://elastic:9200'
```

View the source for the default [ElasticBackend](https://github.com/getmetamapper/metamapper/blob/master/app/omnisearch/backends/elastic_backend.py) that ships with Metamapper.

## Rolling Your Own Search Backend

You can roll out your own search backend as long as the module and class can be imported by Metamapper via string. It must conform to the [BaseSearchBackend](https://github.com/getmetamapper/metamapper/blob/master/app/omnisearch/backends/base_search_backend.py) abstract base class. The `search` method must return a [Django queryset](https://docs.djangoproject.com/en/3.0/ref/models/querysets/) or an iterable of items that support `__getitem__` (such as a list of dictionaires) with the following fields:


| Field | Description |
|-------|-------------|
| `pk` | The primary key of the object to return. |
| `model_name` | The string representation of the Django model associated with this object. Can be `Table`, `Column`, or `Comment`. |
| `score` | Search relevancy score. Used for sorting the results. |
| `datastore_id` | The primary key of the datastore that the object belongs to. |

For example, if you installed Metamapper using the [suggested Docker setup](https://github.com/getmetamapper/metamapper-setup), you could place a new search backend class in the [contrib](https://github.com/getmetamapper/metamapper-setup/tree/master/metamapper/contrib) folder:


```python
# filepath: ./metamapper-setup/metamapper/contrib/custom_search_backend.py

from app.omnisearch.backends.base_search_backend import BaseSearchBackend


class MyCustomSearchBackend(BaseSearchBackend):
    def search(self, search_query_string, **extra_filters):
        return my_super_custom_search_implementation(search_query_string, **extra_filters)
```

And import the custom search backend using the `METAMAPPER_SEARCH_BACKEND` environment variable:

```
METAMAPPER_SEARCH_BACKEND='metamapper.contrib.custom_search_backend.MyCustomSearchBackend'
```

And, remember, if necessary, you can also add additional tasks and other management commands to keep your new search backend in sync with Metamapper.
