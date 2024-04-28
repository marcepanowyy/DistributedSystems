package server.device.light;

import Smarthome.SmartLightI;
import com.zeroc.Ice.Current;
import server.device.SmartHomeDevice;

public class SmartLight extends SmartHomeDevice implements SmartLightI {

    protected final int powerConsumption;

    public SmartLight(String name, int powerConsumption) {
        super(name);
        this.powerConsumption = powerConsumption;
    }

    @Override
    public int getPowerConsumption(Current current) {
        System.out.println("Getting power consumption of the device " + this.name);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return powerConsumption;
    }

}
