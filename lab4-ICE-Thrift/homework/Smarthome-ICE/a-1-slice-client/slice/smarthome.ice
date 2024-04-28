module Smarthome{

    exception SmarthomeException{string message;};
    exception InvalidDeviceStateException extends SmarthomeException{};
    exception InvalidLightStripStateException extends SmarthomeException{};
    exception InvalidLightBulbStateException extends SmarthomeException{};
    exception InvalidDishwasherStateException extends SmarthomeException{};

    interface SmartHomeDeviceI{

        idempotent bool getState();
        idempotent void turnOn() throws InvalidDeviceStateException;
        idempotent void turnOff() throws InvalidDeviceStateException;

    };

    interface SmartLightI extends SmartHomeDeviceI{

        idempotent int getPowerConsumption();

    };

    enum Pattern{

        PULSATING,
        LIGHTNING,
        FLASHING,
        POLICE,
        RANDOM,
        CUSTOM

    };

    enum Color  {

        RED,
        GREEN,
        BLUE,

    };

    struct LightStripConfig{

        int length;
        Pattern pattern;
        Color color;

    };

    interface SmartLightStripI extends SmartLightI{

        idempotent void setPattern(Pattern pattern) throws InvalidLightStripStateException;
        idempotent void setColor(Color color) throws InvalidLightStripStateException;
        idempotent LightStripConfig getConfig() throws InvalidLightStripStateException;

    };

    enum DiodeType {

            LED,
            UV,
            PLASMA,
            PIN,
            LASER,

    };

    struct BulbConfig{
        Color color;
        DiodeType type;
    };

    interface SmartBulbI extends SmartLightI{

        idempotent BulbConfig getConfig() throws InvalidLightBulbStateException;
        idempotent void setColor(Color color) throws InvalidLightBulbStateException;
        idempotent void setDiodeType(DiodeType type) throws InvalidLightBulbStateException;
    };

    enum Program{

        ECO,
        NORMAL,
        INTENSIVE,
        GLASS,
        QUICK,
        CUSTOM

    };

    struct ProgramConfig{

        Program program;
        int temperature;
        int duration;

    };

    ["java:type:java.util.ArrayList<Program>"]
    sequence <Program> ProgramList;

    interface SmartDishwasherI extends SmartHomeDeviceI{

        idempotent void startWashing() throws InvalidDishwasherStateException;
        idempotent void stopWashing() throws InvalidDishwasherStateException;
        idempotent bool isWashing() throws InvalidDishwasherStateException;
        idempotent void setConfig(ProgramConfig config) throws InvalidDishwasherStateException;
        idempotent ProgramConfig getProgramConfig() throws InvalidDishwasherStateException;
        idempotent ProgramList getProgramList();

    };

    struct DeviceInfo {

        string name;
        string type;
        int server;

    };

    ["java:type:java.util.ArrayList<DeviceInfo>"]
    sequence <DeviceInfo> DeviceInfoList;

    interface DeviceManagerI{

        idempotent DeviceInfoList getDevices();

    };

};