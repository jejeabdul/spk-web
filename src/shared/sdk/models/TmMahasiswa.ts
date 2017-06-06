/* tslint:disable */

declare var Object: any;
export interface TmMahasiswaInterface {
  "id"?: number;
  "nim": string;
  "nama": string;
  "email": string;
  "pictures": string;
  "jeniskelamin": string;
  "alamat": string;
  "ttl": string;
  "jenjang": string;
  "tanggalmasuk"?: Date;
  "jurusan": string;
}

export class TmMahasiswa implements TmMahasiswaInterface {
  "id": number;
  "nim": string;
  "nama": string;
  "email": string;
  "pictures": string;
  "jeniskelamin": string;
  "alamat": string;
  "ttl": string;
  "jenjang": string;
  "tanggalmasuk": Date;
  "jurusan": string;
  constructor(data?: TmMahasiswaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TmMahasiswa`.
   */
  public static getModelName() {
    return "TmMahasiswa";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TmMahasiswa for dynamic purposes.
  **/
  public static factory(data: TmMahasiswaInterface): TmMahasiswa{
    return new TmMahasiswa(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'TmMahasiswa',
      plural: 'TmMahasiswas',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "nim": {
          name: 'nim',
          type: 'string'
        },
        "nama": {
          name: 'nama',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "pictures": {
          name: 'pictures',
          type: 'string'
        },
        "jeniskelamin": {
          name: 'jeniskelamin',
          type: 'string'
        },
        "alamat": {
          name: 'alamat',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'string'
        },
        "jenjang": {
          name: 'jenjang',
          type: 'string'
        },
        "tanggalmasuk": {
          name: 'tanggalmasuk',
          type: 'Date'
        },
        "jurusan": {
          name: 'jurusan',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
