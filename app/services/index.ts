import {BaseService} from './BaseService';
import GasyTabService from './GasyTabService';
import NamanaTabService from './NamanaTabService';
import TononkiraService from './TononkiraService';

export const services: BaseService[] = [
  new NamanaTabService(),
  new GasyTabService(),
  new TononkiraService(),
];
export const getService = (serviceName: string) => {
  return services.find(s => s.name == serviceName);
};
