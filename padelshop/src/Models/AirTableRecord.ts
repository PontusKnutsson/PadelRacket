export default interface AirTableResonse<T> {
    records: AirTableRecord<T>[]
}

interface AirTableRecord<T>{
    id: string,
    fields: T
}