import {BaseService} from './BaseService';
import GasyTabService from './GasyTabService';
import LyricsService from './LyricsService';
import CommunityTabService from './CommunityTabService';

export const services: BaseService[] = [
  new LyricsService(),
  new CommunityTabService(),
  new GasyTabService(),
];
export const getService = (serviceName: string) => {
  return services.find(s => s.name == serviceName);
};
