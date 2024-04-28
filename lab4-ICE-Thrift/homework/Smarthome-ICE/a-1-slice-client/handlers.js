const SmartHome = require('./generated/smarthome').Smarthome;
const prompt = require("prompt-sync")();


const extractCategory = (deviceName) => {
    return deviceName.replace(/[0-9]/g, '')
}

const getProxy = async (device, communicator) => {

    const category = extractCategory(device.name)
    return communicator.stringToProxy(`${category}/${device.name} : tcp -h 127.0.0.${device.server} -p 10000 -z`)

}

const handleStrip = async (device, communicator) => {

    const stripProxy = await getProxy(device, communicator)
    const strip = await SmartHome.SmartLightStripIPrx.checkedCast(stripProxy)

    console.log("   -----------------------------------")
    console.log("   GENERAL INFORMATION:")
    console.log(`   * The strip is powered by ${device.server} server`)
    console.log(`   * ${device.name} is ${await strip.getState() ? "ON" : "OFF"}`)
    console.log("   -----------------------------------")
    console.log('   Available options: turnOn, turnOff, getState, setPattern, setColor, getConfig, getPowerConsumption, exit')
    console.log("   -----------------------------------")

    while (true){

        try {

            const input = prompt(`   ${device.name}# `)
            switch (input) {

                case "turnOn":
                    await strip.turnOn()
                    console.log("   You have turned on the strip!")
                    console.log("   -----------------------------------")
                    break;
                case "turnOff":
                    await strip.turnOff()
                    console.log("   You have turned off the strip!")
                    console.log("   -----------------------------------")
                    break;
                case "getState":
                    const state = await strip.getState()
                    console.log(`   The strip is ${state ? "ON" : "OFF"}`)
                    console.log("   -----------------------------------")
                    break;
                case "setPattern":
                    const pattern = prompt(`   ${device.name}(config)# Enter pattern among: PULSATING, LIGHTNING, FLASHING, POLICE, RANDOM: `)
                    const patternEnum = getPatternEnum(pattern)
                    if (!patternEnum) {
                        console.log("   Invalid pattern")
                        console.log("   -----------------------------------")
                        break;
                    }
                    await strip.setPattern(patternEnum)
                    console.log(`   You have set the pattern to ${pattern}`)
                    console.log("   -----------------------------------")
                    break;
                case "setColor":
                    const color = prompt(`   ${device.name}(config)# Enter color among: RED, GREEN, BLUE: `)
                    const colorEnum = getColorEnum(color)
                    if (!colorEnum) {
                        console.log("   Invalid color")
                        console.log("   -----------------------------------")
                        break;
                    }
                    await strip.setColor(colorEnum)
                    console.log(`   You have set the color to ${color}`)
                    console.log("   -----------------------------------")
                    break;
                case "getConfig":
                    const config = await strip.getConfig()
                    console.log(`   The configuration of the strip is: ${config.pattern._name}, ${config.color._name}`)
                    console.log("   -----------------------------------")
                    break;
                case "getPowerConsumption":
                    const power = await strip.getPowerConsumption()
                    console.log(`   The power consumption of the strip is: ${power}`)
                    console.log("   -----------------------------------")
                    break;
                case "exit":
                    console.log("   Exiting config mode...")
                    console.log("--------------------------------------")
                    return;
                default:
                    console.log("   Invalid command")
                    console.log("   -----------------------------------")
                    break;
            }

        } catch (error) {
            console.log(`   ${error.message}`)
            console.log("   -----------------------------------")
        }

    }

}

const handleBulb = async (device, communicator) => {

    const bulbProxy = await getProxy(device, communicator)
    const bulb = await SmartHome.SmartBulbIPrx.checkedCast(bulbProxy)

    console.log("   -----------------------------------")
    console.log("   GENERAL INFORMATION:")
    console.log(`   * The bulb is powered by ${device.server} server`)
    console.log(`   * ${device.name} is ${await bulb.getState() ? "ON" : "OFF"}`)
    console.log("   -----------------------------------")
    console.log('   Available options: turnOn, turnOff, getState, setDiodeType, setColor, getConfig, getPowerConsumption, exit')
    console.log("   -----------------------------------")

    while (true){

        try {

            const input = prompt(`   ${device.name}# `)
            switch (input) {

                case "turnOn":
                    await bulb.turnOn()
                    console.log("   You have turned on the bulb!")
                    console.log("   -----------------------------------")
                    break;
                case "turnOff":
                    await bulb.turnOff()
                    console.log("   You have turned off the bulb!")
                    console.log("   -----------------------------------")
                    break;
                case "getState":
                    const state = await bulb.getState()
                    console.log(`   The bulb is ${state ? "ON" : "OFF"}`)
                    console.log("   -----------------------------------")
                    break;
                case "setDiodeType":
                    const diode = prompt(`   ${device.name}(config)# Enter diode type among: LED, UV, PLASMA, PIN, LASER: `)
                    const diodeEnum = getDiodeEnum(diode)
                    if (!diodeEnum) {
                        console.log("   Invalid diode type")
                        console.log("   -----------------------------------")
                        break;
                    }
                    await bulb.setDiodeType(diodeEnum)
                    console.log(`   You have set the diode type to ${diode}`)
                    console.log("   -----------------------------------")
                    break;
                case "setColor":
                    const color = prompt(`   ${device.name}(config)# Enter color among: RED, GREEN, BLUE: `)
                    const colorEnum = getColorEnum(color)
                    if (!colorEnum) {
                        console.log("   Invalid color")
                        console.log("   -----------------------------------")
                        break;
                    }
                    await bulb.setColor(colorEnum)
                    console.log(`   You have set the color to ${color}`)
                    console.log("   -----------------------------------")
                    break;
                case "getConfig":
                    const config = await bulb.getConfig()
                    console.log(`   The configuration of the bulb is: ${config.type._name}, ${config.color._name}`)
                    console.log("   -----------------------------------")
                    break;
                case "getPowerConsumption":
                    const power = await bulb.getPowerConsumption()
                    console.log(`   The power consumption of the bulb is: ${power}`)
                    console.log("   -----------------------------------")
                    break;
                case "exit":
                    console.log("   Exiting config mode...")
                    console.log("--------------------------------------")
                    return;
                default:
                    console.log("   Invalid command")
                    console.log("   -----------------------------------")
                    break;
            }

        } catch (error) {
            console.log(`   ${error.message}`)
            console.log("   -----------------------------------")
        }
    }

}

const handleDishwasher = async (device, communicator) => {

    const dishwasherProxy = await getProxy(device, communicator)
    const dishwasher = await SmartHome.SmartDishwasherIPrx.checkedCast(dishwasherProxy)

    console.log("   -----------------------------------")
    console.log("   GENERAL INFORMATION:")
    console.log(`   * The dishwasher is powered by ${device.server} server`)
    console.log(`   * ${device.name} is ${await dishwasher.getState() ? "ON" : "OFF"}`)
    console.log("   -----------------------------------")
    console.log('   Available options: turnOn, turnOff, getState, startWashing, stopWashing, isWashing, getProgramConfig, getProgramList, setConfig, exit')
    console.log("   -----------------------------------")

    while (true){

        try {

            const input = prompt(`   ${device.name}# `)
            switch (input) {

                case "turnOn":
                    await dishwasher.turnOn()
                    console.log("   You have turned on the dishwasher!")
                    console.log("   -----------------------------------")
                    break;
                case "turnOff":
                    await dishwasher.turnOff()
                    console.log("   You have turned off the dishwasher!")
                    console.log("   -----------------------------------")
                    break;
                case "getState":
                    const state = await dishwasher.getState()
                    console.log(`   The dishwasher is ${state ? "ON" : "OFF"}`)
                    console.log("   -----------------------------------")
                    break;
                case "startWashing":
                    await dishwasher.startWashing()
                    console.log("   You have started washing!")
                    console.log("   -----------------------------------")
                    break;
                case "stopWashing":
                    await dishwasher.stopWashing()
                    console.log("   You have stopped washing!")
                    console.log("   -----------------------------------")
                    break;
                case "isWashing":
                    const washing = await dishwasher.isWashing()
                    console.log(`   The dishwasher is ${washing ? "washing" : "not washing"}`)
                    console.log("   -----------------------------------")
                    break;
                case "getProgramConfig":
                    const config = await dishwasher.getProgramConfig()
                    console.log(`   The program configuration is: ${config.program._name} ${config.temperature}°C, ${config.duration} minutes`)
                    console.log("   -----------------------------------")
                    break;
                case "getProgramList":
                    const list = await dishwasher.getProgramList()
                    console.log(`   The available programs are: ${list}`)
                    console.log("   -----------------------------------")
                    break;
                case "setConfig":
                    const program = prompt(`   ${device.name}(config)# Enter program among: ECO, NORMAL, INTENSIVE, GLASS, QUICK, CUSTOM: `)
                    const programEnum = getProgramEnum(program)
                    if (!programEnum) {
                        console.log("   Invalid program")
                        console.log("   -----------------------------------")
                        break;
                    }
                    const temperature = prompt(`   ${device.name}(config)# Enter temperature (40-70): `)
                    const time = prompt(`   ${device.name}(config)# Enter time in minutes (10-280): `)
                    const programConfig = getProgramConfig(programEnum, temperature, time)
                    await dishwasher.setConfig(programConfig)
                    console.log(`   You have set the program to ${program}, temperature to ${temperature}°C and time to ${time} minutes`)
                    console.log("   -----------------------------------")
                    break;
                case "exit":
                    console.log("   Exiting config mode...")
                    console.log("--------------------------------------")
                    return;
                default:
                    console.log("   Invalid command")
                    console.log("   -----------------------------------")
                    break;
            }

        } catch (error) {
            console.log(`   ${error.message}`)
            console.log("   -----------------------------------")
        }
    }

}

const getColorEnum = (color) => {
    switch (color) {
        case "RED":
            return SmartHome.Color.RED
        case "GREEN":
            return SmartHome.Color.GREEN
        case "BLUE":
            return SmartHome.Color.BLUE
        default:
            return false
    }
}

const getPatternEnum = (pattern) => {
    switch (pattern) {
        case "PULSATING":
            return SmartHome.Pattern.PULSATING
        case "LIGHTNING":
            return SmartHome.Pattern.LIGHTNING
        case "FLASHING":
            return SmartHome.Pattern.FLASHING
        case "POLICE":
            return SmartHome.Pattern.POLICE
        case "RANDOM":
            return SmartHome.Pattern.RANDOM
        default:
            return false
    }
}

const getDiodeEnum = (diode) => {
    switch (diode) {
        case "LED":
            return SmartHome.Diode.LED
        case "UV":
            return SmartHome.Diode.UV
        case "PLASMA":
            return SmartHome.Diode.PLASMA
        case "PIN":
            return SmartHome.Diode.PIN
        case "LASER":
            return SmartHome.Diode.LASER
        default:
            return false
    }
}

const getProgramEnum = (program) => {
    switch (program) {
        case "ECO":
            return SmartHome.Program.ECO
        case "NORMAL":
            return SmartHome.Program.NORMAL
        case "INTENSIVE":
            return SmartHome.Program.INTENSIVE
        case "GLASS":
            return SmartHome.Program.GLASS
        case "QUICK":
            return SmartHome.Program.QUICK
        case "CUSTOM":
            return SmartHome.Program.CUSTOM
        default:
            return false
    }
}

const getProgramConfig = (program, temperature, time) => {
    return new SmartHome.ProgramConfig(program, temperature, time)
}

exports.handleStrip = handleStrip
exports.handleBulb = handleBulb
exports.handleDishwasher = handleDishwasher