export default interface ICreateReadingDTO {
  machine_id: string;
  welding_current: number;
  welding_voltage: number;
  arc_status: boolean;
  wire_speed: number;
  voltageL1: number;
  voltageL2: number;
  voltageL3: number;
  currentL1: number;
  currentL2: number;
  currentL3: number;
  gas_flow: number;
}
