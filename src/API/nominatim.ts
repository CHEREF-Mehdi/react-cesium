
export async function searchPlace (city: string, time:number){
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`,
    {
      method: "GET",
    }
  )
  
  return {
    data:await res.json()  as NS_GEODATA.IPlaceDTO[],
    time
  }
};
