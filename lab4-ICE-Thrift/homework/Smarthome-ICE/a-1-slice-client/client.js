const Ice = require('ice').Ice;
const SmartHome = require('./generated/smarthome').Smarthome;
const prompt = require('prompt-sync')()

const server = 2

const getDevices = async (communicator) => {

    const deviceManagerProxy = communicator.stringToProxy(`deviceManager/manager1 : tcp -h 127.0.0.${server} -p 10000 : udp -h 127.0.0.${server} -p 10000`)
    const deviceManager = await SmartHome.DeviceManagerIPrx.checkedCast(deviceManagerProxy);
    const devices = await deviceManager.getDevices();
    return devices.filter(device => device.server === server)

}

const greet = () => {

    console.log("--------------------------------------")
    console.log('Welcome to the SmartHome system');
    console.log("--------------------------------------")
    console.log(`To see all available categories on server ${server} of devices, type 'cat'`)
    console.log(`To see all available devices on server ${server}, type 'all'`)
    console.log('Enter device name to interact with it, or type "exit" to quit');
    console.log("--------------------------------------")

}

const printCategories = (devices) => {
    [...new Set(devices.map(device => device.type))].forEach(type => console.log("* " + type))
    console.log("--------------------------------------")
}

const printDevices = (devices) => {
    devices.forEach(device => console.log("* " + device.name))
    console.log("--------------------------------------")
}

const findDevice = (deviceName, devices) => {
    return devices.find(device => device.name === deviceName)
}

const extractCategory = (deviceName) => {
    return deviceName.replace(/[0-9]/g, '')
}

const main = async () => {

    const communicator = Ice.initialize();
    const devices = await getDevices(communicator)
    greet();

    while (true) {

        const input = prompt('==> ');

        if (!input || input === '') {
            continue;
        }

        if (input === 'cat'){
            printCategories(devices)
            continue;
        }

        if (input === 'all'){
            printDevices(devices)
            continue;
        }

        if (input === 'exit') {
            break;
        }

        if (!findDevice(input, devices)) {
            console.log('Device not found')
            console.log("--------------------------------------")
            continue;
        }

        try {

            const device = findDevice(input, devices)
            const category = extractCategory(device.name)

            switch (category) {

                case 'strip':
                    await require('./handlers').handleStrip(device, communicator)
                    break;
                case 'bulb':
                    await require('./handlers').handleBulb(device, communicator)
                    break;
                case 'dishwasher':
                    await require('./handlers').handleDishwasher(device, communicator)
                    break;
                default:
                    console.log('Device not found')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    communicator.destroy()
}

main()
