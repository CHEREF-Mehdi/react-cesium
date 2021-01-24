namespace NS_FORM {
  export interface IFormValidation {
    message0?:string;
    message1?: string;
    message2?: string;
  }
}

namespace NS_GEODATA {
  export interface IPlaceDTO {
    display_name: string;
    place_id: number;
    lat: string;
    lon: string;
    importance: number;
  }

  export interface IPlace extends IPlaceDTO{
    givenName: string;
    givenId: string;
    creationDate:number;
  }
}
