package server.device.light.bulb;

import Smarthome.*;
import com.zeroc.Ice.Current;
import server.device.light.SmartLight;

public class SmartBulb extends SmartLight implements SmartBulbI {

    private BulbConfig config;

    public SmartBulb(String name, int powerConsumption) {
        super(name, powerConsumption);
        this.config = new BulbConfig(Color.RED, DiodeType.LED);
    }

    @Override
    public void setColor(Color color, Current current) throws InvalidLightBulbStateException{

        if (!this.state){
            throw new InvalidLightBulbStateException("Before setting the color, turn on the bulb");
        }
        System.out.println("Setting color for " + this.name + " to " + color);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.config.color = color;
    }

    @Override
    public void setDiodeType(DiodeType type, Current current) throws InvalidLightBulbStateException{

        if (!this.state){
            throw new InvalidLightBulbStateException("Before setting the diode type, turn on the bulb");
        }

        System.out.println("Setting diode type for " + this.name + " to " + type);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.config.type = type;

    }

    @Override
    public BulbConfig getConfig(Current current) throws InvalidLightBulbStateException{

        if (!this.state){
            throw new InvalidLightBulbStateException("Before getting the config, turn on the bulb");
        }

        System.out.println("Getting config for " + this.name + " " + this.config.color + " " + this.config.type);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return this.config;

    }

}
