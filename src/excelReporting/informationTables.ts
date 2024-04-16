
import { DateTime } from 'luxon';
const dt: DateTime = DateTime.now();
let nameReport: string = `Report-${dt.toISODate()?.toString()}-${dt.toISOTime()?.toString()}` ;

export const  headersTable = [
    {label: "idProduct", value: "Id of Product"},
    {label: "name", value: "Name Product"},
    {label: "quatity_Product", value: "Quantity Product"},
    {label: "registration_Date", value: "Registration Date"}
]


export const setting = {
    
        fileName: `${nameReport}`,
        extraLength: 3,
        writeMode: "writeFile",
        writeOptions:{},
        RTL: true,
    }

