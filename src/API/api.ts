export const test = () => {
  return "";
};

export interface IPlace{
  display_name:string;
  place_id:number;
  lat:number;
  lon:number;
  importance:number;
}

// API search function
export async function searchCity (city: string, time:number){
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`,
    {
      method: "GET",
    }
  )
  return {data:await res.json()  as IPlace[],time}
};
