import org.apache.zookeeper.*;

import java.io.IOException;
import java.util.List;


public class NodeWatcher implements Watcher {

    private final String SELECTED_NODE = "/a";
    private final ZooKeeper zooKeeper;
    private boolean processRunning = false;
    private final String processName;
    private static Process process;

    public NodeWatcher(String clientIpPort, String processName) throws IOException, InterruptedException, KeeperException {

        this.processName = processName;
        this.zooKeeper = new ZooKeeper(clientIpPort, 3000, this);
        this.zooKeeper.addWatch("/", this, AddWatchMode.PERSISTENT_RECURSIVE);

    }

    @Override
    public void process(WatchedEvent watchedEvent) {

        Event.EventType event = watchedEvent.getType();

        try {

            if (event == Event.EventType.NodeCreated) handleNodeCreated(watchedEvent.getPath());
            else if (event == Event.EventType.NodeDeleted) handleNodeDeleted(watchedEvent.getPath());

        } catch (InterruptedException | KeeperException | IOException e) {
            System.out.println("Error occurred: " + e.getMessage());
        }

    }

    private void handleNodeCreated(String path) throws InterruptedException, KeeperException, IOException {

        if (path.equals(SELECTED_NODE)) {
            System.out.println("\nCreated root node: " + path);
            runExternalApp();
        }

        else if (path.startsWith(SELECTED_NODE)) {
            System.out.println("\nCreated descendant node: " + path);
            System.out.println("Total number of descendants: " + getDescendantCount());
        }

        System.out.println();

    }

    private void handleNodeDeleted(String path) {

        if (path.equals(SELECTED_NODE)) {
            System.out.println("\nDeleted root node: " + path);
            stopExternalApp();
        }

    }

    public void printTreeStructure(String nodePath, int level) throws KeeperException, InterruptedException {

        if (zooKeeper.exists(nodePath, false) == null) {
            return;
        }

        if (level == 0) {
            System.out.println("\n"+SELECTED_NODE.replaceFirst("/", ""));
        }

        List<String> children = zooKeeper.getChildren(nodePath, false);

        for (String child : children) {
            String childPath = nodePath.equals("/") ? "/" + child : nodePath + "/" + child;
            System.out.println("    ".repeat(Math.max(0, level)) + "|--" + child);
            printTreeStructure(childPath, level + 1);
        }

    }

    private int getDescendantCount() throws KeeperException, InterruptedException {

        if (zooKeeper.exists(SELECTED_NODE, false) == null) {
            return 0;
        }

        return zooKeeper.getAllChildrenNumber(SELECTED_NODE);

    }

    private void runExternalApp() throws IOException {

        if (!processRunning) {
            System.out.println("\nOpening external graphical application: " + processName);
            ProcessBuilder processBuilder = new ProcessBuilder(processName);
            process = processBuilder.start();
            processRunning = true;
        }

    }

    private void stopExternalApp() {

        if (processRunning && process != null) {
            System.out.println("\nClosing external graphical application: " + processName);
            process.destroy();
            processRunning = false;
        }

    }

}
