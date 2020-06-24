---
id: installation--search
title: Search
---

Search is an integral part of Metamapper.

Once your datastore schema is crawled and saved in the metastore, it should also be indexed via some sort of search engine. Once indexed, your users will be able to discover data assets with simple search queries.

## Configuring the Backend

You can configure the search backend by referencing the full Python class path in the `METAMAPPER_SEARCH_BACKEND` environment variable.

Since Metamapper uses Postgres as the metastore, we leverage [full text search](https://www.postgresql.org/docs/9.6/textsearch.html) by default. This should work for most use case and requires no additional software. It also does not require any additional background tasks or commands to maintain.

View the source for the default [PostgresSearchBackend](https://github.com/metamapper-io/metamapper/blob/master/app/omnisearch/backends/postgres_search_backend.py) that ships with Metamapper.

## Rolling Your Own Search Backend

Sometimes you need something a bit more heavyweight for search, like [Elasticsearch](https://www.elastic.co/) or Solr. While we don't support these engines by default, you could write your own.

You can roll out your own search backend as long as the module and class can be imported by Metamapper via string. It must conform to the [BaseSearchBackend](https://github.com/metamapper-io/metamapper/blob/master/app/omnisearch/backends/base_search_backend.py) abstract base class. The `search` method must return a [Django queryset](https://docs.djangoproject.com/en/3.0/ref/models/querysets/) with the following fields:


| Field | Description |
|-------|-------------|
| `pk` | The primary key of the object to return. |
| `model_name` | The string representation of the Django model associated with this object. Can be `Table`, `Column`, or `Comment`. |
| `score` | Search relevancy score. Used for sorting the results. |
| `datastore_id` | The primary key of the datastore that the object belongs to. |

For example, if you installed Metamapper using the [suggested Docker setup](https://github.com/metamapper-io/metamapper-setup), you could place a new search backend class in the [contrib](https://github.com/metamapper-io/metamapper-setup/tree/master/metamapper/contrib) folder:


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
