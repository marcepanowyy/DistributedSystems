package server;

import com.zeroc.Ice.*;
import com.zeroc.Ice.Communicator;
import com.zeroc.Ice.ObjectAdapter;
import server.device.DeviceManager;
import server.device.dishawasher.SmartDishwasher;
import server.device.light.bulb.SmartBulb;
import server.device.light.strip.SmartLightStrip;

import java.lang.Exception;

public class IceServer {

	private ObjectAdapter createAdapter1(Communicator communicator) {

		ObjectAdapter adapter = communicator.createObjectAdapter("Adapter1");

		SmartLightStrip smartLightStripServant1 = new SmartLightStrip("strip1", 1);
		SmartLightStrip smartLightStripServant2 = new SmartLightStrip("strip2", 2);
		SmartBulb smartBulbServant1 = new SmartBulb("bulb1", 1);
		SmartBulb smartBulbServant2 = new SmartBulb("bulb2", 10);

		adapter.add(smartLightStripServant1, new Identity("strip1", "strip"));
		adapter.add(smartLightStripServant2, new Identity("strip2", "strip"));
		adapter.add(smartBulbServant1, new Identity("bulb1", "bulb"));
		adapter.add(smartBulbServant2, new Identity("bulb2", "bulb"));

		return adapter;

	}

	private ObjectAdapter createAdapter2(Communicator communicator) {

		ObjectAdapter adapter = communicator.createObjectAdapter("Adapter2");

		SmartDishwasher smartDishwasherServant1 = new SmartDishwasher("dishwasher1");
		SmartDishwasher smartDishwasherServant2 = new SmartDishwasher("dishwasher2");

		adapter.add(smartDishwasherServant1, new Identity("dishwasher1", "dishwasher"));
		adapter.add(smartDishwasherServant2, new Identity("dishwasher2", "dishwasher"));

		return adapter;

	}

	public void run(String[] args) {

		String[] iceConfigParts = args[0].split("=");
		String value = iceConfigParts[1];
		int type = Integer.parseInt(value.substring(value.length() - 1));

		int status = 0;
		Communicator communicator = null;

		try {

			communicator = com.zeroc.Ice.Util.initialize(args);
			ObjectAdapter adapter = 1 == type ? createAdapter1(communicator) : createAdapter2(communicator);

			DeviceManager deviceManagerServant = new DeviceManager();
			adapter.add(deviceManagerServant, new Identity("manager1", "deviceManager"));
			adapter.activate();

			System.out.println("Entering event processing loop...");
			communicator.waitForShutdown();

		} catch (Exception e) {
			e.printStackTrace(System.err);
			status = 1;
		}
		if (communicator != null) {
			try {
				communicator.destroy();
			} catch (Exception e) {
				e.printStackTrace(System.err);
				status = 1;
			}
		}
		System.exit(status);
	}

	// run with --Ice.Config=config.server1 or --Ice.Config=config.server2
	public static void main(String[] args) {
		IceServer app = new IceServer();
		app.run(args);
	}


}
