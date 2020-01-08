import BusComp from "./Bus.vue";

export interface Bus {
  emit(event: string, ...args: any[]): any;

  once(event: string, callback: (...args: any[]) => void): any;

  on(event: string, callback: (...args: any[]) => void): any;

  off(event: string, callback: (...args: any[]) => void): any;
}

export default new BusComp() as Bus;
