package server.device;

import Smarthome.InvalidDeviceStateException;
import Smarthome.SmartHomeDeviceI;
import com.zeroc.Ice.Current;

public class SmartHomeDevice implements SmartHomeDeviceI {

    protected final String name;
    protected boolean state;

    public SmartHomeDevice(String name) {
        this.name = name;
        this.state = false;
    }

    public String getName() {
        return this.name;
    }

    @Override
    public boolean getState(Current current) {
        System.out.println("Device " + this.name + " is " + (state ? "on" : "off"));
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return this.state;
    }

    @Override
    public void turnOn(Current current) throws InvalidDeviceStateException {
        if (state) {
            throw new InvalidDeviceStateException("Device is already turned on");
        }
        state = true;
        System.out.println("Device " + this.name + " is turned on");
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
    }

    @Override
    public void turnOff(Current current) throws InvalidDeviceStateException{
        if (!state) {
            throw new InvalidDeviceStateException("Device is already turned off");
        }
        state = false;
        System.out.println("Device " + this.name + " is turned off");
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
    }

}