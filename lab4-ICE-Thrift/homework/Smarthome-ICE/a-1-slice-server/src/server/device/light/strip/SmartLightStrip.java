package server.device.light.strip;

import Smarthome.*;
import com.zeroc.Ice.Current;
import server.device.light.SmartLight;


public class SmartLightStrip extends SmartLight implements SmartLightStripI {

    private LightStripConfig config;

    public SmartLightStrip(String name, int powerConsumption) {
        super(name, powerConsumption);
        this.config = new LightStripConfig(10, Pattern.LIGHTNING, Color.BLUE);
    }

    @Override
    public void setPattern(Pattern pattern, Current current) throws InvalidLightStripStateException{

        if (!this.state){
            throw new InvalidLightStripStateException("Before setting the pattern, turn on the light strip");
        }
        System.out.println("Setting pattern for " + this.name + " to " + pattern);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.config.pattern = pattern;
    }

    @Override
    public void setColor(Color color, Current current) throws InvalidLightStripStateException{

        if (!this.state){
            throw new InvalidLightStripStateException("Before setting the color, turn on the light strip");
        }
        System.out.println("Setting color for " + this.name + " to " + color);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.config.color = color;
    }

    @Override
    public LightStripConfig getConfig(Current current) throws InvalidLightStripStateException {

        if (!this.state){
            throw new InvalidLightStripStateException("Before getting the config, turn on the light strip");
        }
        System.out.println("Getting config for " + this.name + " " + this.config.length + " " + this.config.pattern + " " + this.config.color);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return this.config;
    }
}



