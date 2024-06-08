import org.apache.zookeeper.KeeperException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

// CLIENT_IP:PORT PROCESS_NAME
// localhost:2181 mspaint.exe

public class Main {

    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {


        if (args.length != 2) {
            System.out.println("CLIENT_IP:PORT OR PROCESS_NAME IS MISSING");
            System.exit(1);
        }

        String line;
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

        String clientIpPort = args[0];
        String processName = args[1];

        System.out.println("Client IP Port: " + clientIpPort);
        System.out.println("Process Name: " + processName);

        System.out.println("To print tree structure of the node 'a', type 'tree' and press Enter");
        System.out.println();

        NodeWatcher nodeWatcher = new NodeWatcher(clientIpPort, processName);

        while (true) {

            System.out.print("Enter data from console ==> ");
            line = in.readLine();

            switch (line) {
                case "tree" ->
                {
                    nodeWatcher.printTreeStructure("/a", 0);
                    System.out.println();
                }
                case "" -> System.out.println();
                case "exit" -> {
                    System.out.println("Exiting...");
                    System.exit(0);
                }
                default -> System.out.println("Invalid command");
            }

        }




    }
}
