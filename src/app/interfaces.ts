export interface ModalData {
  header: string;
  description: string;
}

export interface Events {
  date: string;
  events: EventData[];
}

export interface EventData {
  name: MultiLang;
  description: MultiLang;
  poster: MediaData;
  NearestSchedule: ScheduleData;
}

export interface MultiLang {
  en: string;
  ru: string;
  etc: string;
}

export interface MediaData {
  name: string;
  path: string;
  width: number;
  height: number;
}

export interface ScheduleData {
  begin_time: string;
  begin: string;
}
