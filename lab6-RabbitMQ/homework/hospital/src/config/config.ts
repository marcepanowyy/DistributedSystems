import { Config } from "./interface";

export const config: Config = {
    exchanges: [
        {
            name: 'technician-exchange',
            type: 'topic',
            queues: [
                {
                    // queue for technician 1
                    name: 'technician-hip-queue',
                    bindingKeys: ['hip']
                },
                {
                    // queue for technician 2
                    name: 'technician-elbow-queue',
                    bindingKeys: ['elbow']
                },
                {
                    // common queue for technician 1 and 2
                    name: 'technician-knee-queue',
                    bindingKeys: ['knee']
                },
                {
                    // queue for sending copy of messages to logger exchange
                    name: 'technician-logger-queue',
                    bindingKeys: ['#']
                }
            ],
        },
        {
            name: 'doctor-exchange',
            type: 'topic',
            queues: [
                {
                    // queue for doctor 1
                    name: 'doctor-1-queue',
                    bindingKeys: ['doctor-1']
                },
                {
                    // queue for doctor 2
                    name: 'doctor-2-queue',
                    bindingKeys: ['doctor-2']
                },
                {
                    // queue for sending copy of messages to logger exchange
                    name: 'doctor-logger-queue',
                    bindingKeys: ['#']
                }
            ],
        },
        {
            name: 'admin-exchange',
            type: 'topic',
            queues: [
                {
                    name: 'admin-technician-1-queue',
                    bindingKeys : ['technician-1', 'all']
                },
                {
                    name: 'admin-technician-2-queue',
                    bindingKeys: ['technician-2', 'all']
                },
                {
                    name: 'admin-doctor-1-queue',
                    bindingKeys: ['doctor-1', 'all']
                },
                {
                    name: 'admin-doctor-2-queue',
                    bindingKeys: ['doctor-2', 'all']
                }
            ],
        },
    ],
    examinations: [
        {
            name: 'elbow',
            technicians: ['technician-1'],
            duration: 5000
        },
        {
            name: 'hip',
            technicians: ['technician-2'],
            duration: 10000
        },
        {
            name: 'knee',
            technicians: ['technician-1', 'technician-2'],
            duration: 7000
        }
    ],
    doctors: ['doctor-1', 'doctor-2'],
    technicians: ['technician-1', 'technician-2'],
    admins: ['admin-1']
}
