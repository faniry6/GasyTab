import {BaseService} from './BaseService';
import GasyTabService from './GasyTabService';
import OpenChordService from './OpenChordService';
import LyricsService from './LyricsService';

export const services: BaseService[] = [
  new LyricsService(),
  new OpenChordService(),
];
export const getService = (serviceName: string) => {
  return services.find(s => s.name == serviceName);
};
