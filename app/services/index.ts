import {BaseService} from './BaseService';
import GasyTabService from './GasyTabService';

export const services: BaseService[] = [new GasyTabService()];
export const getService = (serviceName: string) => {
  return services.find(s => s.name == serviceName);
};
