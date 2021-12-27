import axios from 'axios'
import PadelRacket from "@/Models/AirTablePadelRacket";
import AirTableResonse from '@/Models/AirTableRecord';

const axiosInstance = axios.create({
    baseURL: "/.netlify/functions",
    timeout: 10000
});

// axiosInstance.get("airtable_function").then(resp => {
//     console.log(resp.data);
//   });



export async function GetPadelRacket() : Promise<AirTableResonse<PadelRacket>> {
    const data = axiosInstance.get("airtable_function").then(resp => {
        return resp.data;
    });

    return data;
}