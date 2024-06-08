
### General info

NodeWatcher class implements the Watcher interface from the Apache Zookeeper library. The class sets up a connection to the ZooKeeper service using the provided connection string and the name of the process and is responsible for watching the nodes in the Zookeeper server. 

When node `a` is created, the external graphical app is opened.

When node `a` is deleted, the external graphical app is closed.

Adding any descendant of `a` will show the count of descendants.

When typing `tree` in the application console, the tree structure of the nodes is printed.

The app is working in Replicated Zookeeper environment, thus at least 3 servers are needed.
(Number of servers in replication mode should be odd number to avoid split-brain problem)

### Running the app

To run the servers:

```
docker-compose up -d
```

To run the client, enter one of the server containers console.
Command for the first client:

```
zkCli.sh -server localhost:2181
```

Similarly, for the second client with port 2182 and the third client with port 2183.

Then, run the Main class with valid arguments, for example

```
127.0.0.1:2181 mspaint.exe
```
