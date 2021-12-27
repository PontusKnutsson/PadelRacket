export interface AirTableResonse<T> {
    records: AirTableRecord<T>[]
}

export interface AirTableRecord<T>{
    id: string,
    fields: T
}