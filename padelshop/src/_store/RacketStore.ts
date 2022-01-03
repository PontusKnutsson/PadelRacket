import { reactive } from "vue"
import { AirTableRecord } from "@/Models/AirTableRecord"
import PadelRacket from "@/Models/AirTablePadelRacket"

const RecRacketStore = reactive({
    rackets: [] as AirTableRecord<PadelRacket>[]
});

export function GetRackets():  AirTableRecord<PadelRacket>[]{
    return RecRacketStore.rackets;
}

export function SetRackets(rackets: AirTableRecord<PadelRacket>[]) {
    RecRacketStore.rackets = rackets;
}