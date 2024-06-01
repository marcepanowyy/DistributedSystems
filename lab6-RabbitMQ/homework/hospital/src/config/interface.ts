interface QueueConfig {
    name: string;
    bindingKeys: string[];
}

interface ExchangeConfig {
    name: string;
    queues: QueueConfig[];
    type: 'topic' | 'direct' | 'fanout' | 'headers';
}

interface ExaminationConfig {
    name: string;
    technicians: string[];
    duration: number;
}

export interface Config {
    exchanges: ExchangeConfig[];
    examinations: ExaminationConfig[]
    doctors: string[];
    technicians: string[];
    admins: string[];
}

export interface MessageContentI {

    sender: string;
    patient?: string;
    examination?: string;
    time: string;
    adminMessage?: string;

}