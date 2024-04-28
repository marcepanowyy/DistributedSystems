package server.device.dishawasher;

import Smarthome.InvalidDishwasherStateException;
import Smarthome.Program;
import Smarthome.ProgramConfig;
import Smarthome.SmartDishwasherI;
import com.zeroc.Ice.Current;
import server.device.SmartHomeDevice;

import java.util.List;

public class SmartDishwasher extends SmartHomeDevice implements SmartDishwasherI {

    private boolean isWashing;
    private ProgramConfig config;

    public SmartDishwasher(String name) {
        super(name);
        this.isWashing = false;
        this.config = new ProgramConfig(Program.NORMAL, 60, 60);
    }

    @Override
    public void startWashing(Current current) throws InvalidDishwasherStateException {

        if (!this.state) {
            throw new InvalidDishwasherStateException("Before starting the washing, turn on the dishwasher");
        }

        if (this.isWashing) {
            throw new InvalidDishwasherStateException("The dishwasher is already washing");
        }

        System.out.println("Starting washing for " + this.name);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.isWashing = true;

    }

    @Override
    public void stopWashing(Current current) throws InvalidDishwasherStateException {

        if (!this.state) {
            throw new InvalidDishwasherStateException("You can't stop the dishwasher. It is already off.");
        }

        if (!this.isWashing) {
            throw new InvalidDishwasherStateException("The dishwasher is not washing");
        }

        System.out.println("Stopping washing for " + this.name);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.isWashing = false;

    }

    @Override
    public boolean isWashing(Current current) throws InvalidDishwasherStateException{

        if (!this.state) {
            throw new InvalidDishwasherStateException("The dishwasher is off");
        }

        System.out.println("Checking if" + this.name + " is washing");
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return this.isWashing;

    }

    @Override
    public void setConfig(ProgramConfig config, Current current) throws InvalidDishwasherStateException {

        if (!this.state) {
            throw new InvalidDishwasherStateException("Before setting the config, turn on the dishwasher");
        }

        if ( config.temperature < 40 || config.temperature > 70){
            throw new InvalidDishwasherStateException("Invalid temperature. It should be between 40 and 70");
        }

        if ( config.duration < 20 || config.duration > 280){
            throw new InvalidDishwasherStateException("Invalid duration. It should be between 20 and 280");
        }

        System.out.println("Setting config for " + this.name + " to " + config.program + " " + config.temperature + " " + config.duration);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        this.config = config;

    }

    @Override
    public ProgramConfig getProgramConfig(Current current) throws InvalidDishwasherStateException {

        if (!this.state) {
            throw new InvalidDishwasherStateException("Before getting the config, turn on the dishwasher");
        }

        System.out.println("Getting config for " + this.name + " " + this.config.program + " " + this.config.temperature + " " + this.config.duration);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return this.config;

    }

    @Override
    public List<Program> getProgramList(Current current) {

        System.out.println("Getting program list for " + this.name);
        System.out.println("Current id: " + current.id.name + " " + current.id.category);
        return List.of(Program.ECO, Program.NORMAL, Program.INTENSIVE, Program.GLASS, Program.QUICK, Program.CUSTOM);

    }

}
