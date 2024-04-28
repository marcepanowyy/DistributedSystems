package server.device;

import Smarthome.DeviceInfo;
import Smarthome.DeviceManagerI;
import com.zeroc.Ice.Current;

import java.util.ArrayList;
import java.util.List;

public class DeviceManager implements DeviceManagerI {

    private final List<DeviceInfo> devices = new ArrayList<>();

    public DeviceManager(){

        devices.add(new DeviceInfo("strip1", "Smart Light Strip", 1));
        devices.add(new DeviceInfo("strip2", "Smart Light Strip", 1));
        devices.add(new DeviceInfo("bulb1", "Smart Bulb", 1));
        devices.add(new DeviceInfo("bulb2", "Smart Bulb", 1));

        devices.add(new DeviceInfo("dishwasher1", "Smart Dishwasher", 2));
        devices.add(new DeviceInfo("dishwasher2", "Smart Dishwasher", 2));

    }

    @Override
    public List<DeviceInfo> getDevices(Current current) {
        System.out.println("Getting devices");
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return devices;
    }
}
