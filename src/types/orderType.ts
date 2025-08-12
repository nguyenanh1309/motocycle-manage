export interface OrderType {
  id?: any;
  account_id: string;
  code: string;
  customer_id: string;
  customer_name: string;
  total: string;
  note: string;
  status: string;
  brand_id: string;
  date: string;
}


export interface CustomerType {
  id: string;
  name: string;
  phone: string;
  licensePlate: string;
  address?: string;
  district?: string;
  sub_district?: string;
}

export interface MoreInfomationType {
  branch_id: string;
  staff_id: string;
  start_date: string;
  end_date: string;
}

export interface SpareType {
  id?: string
  name: string
  price: number
  quantity: number
} 

export interface ServiceType {
  id?: string
  service_name: string
  price: number
  quantity: number
  sub_total: number
  spare_parts: SpareType[];
}
