# -*- coding: utf-8 -*-

import pyodbc


def _fetchTriples(sql, username, password):
        import pandas.io.sql as psql
        try:
                c = pyodbc.connect("DSN=CARRE Virtuoso;UID=" + username + ";PWD=" + password)
                data = psql.read_sql(sql, con=c)
                c.commit()
                c.close()
        except Exception, e:
                data = None
        return data

username = "kolchinmax"
password = "159951ghj"
sql = "SPARQL SELECT ?subject ?predicate ?object FROM <http://carre.kmi.open.ac.uk/users/"+username+"> WHERE { ?subject ?predicate ?object }"
data = _fetchTriples(sql, username, password)
print data
