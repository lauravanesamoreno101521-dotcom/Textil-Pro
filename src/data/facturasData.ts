import { Factura } from '../types';

// Historial real de facturas 2026 para COOLKIDS e IMPERIUM, extraido de
// "NOMINA 2026.xlsx". Cada factura incluye el desglose de labores estandar
// y que operario realizo cada labor, con su cantidad y valor pagado (COP).
// Nombres de operarios normalizados para corregir variantes de escritura
// (ej. "ALEXANDER"/"ALESANDER"/"ALES" se unificaron en un solo operario).
// facturaNumero = "S/N" indica que la factura original no tenia numero asignado.
export const INITIAL_FACTURAS: Factura[] = [
  {
    "id": "FAC-COOLKIDS-1651",
    "facturaNumero": 1651,
    "empresa": "COOLKIDS",
    "descripcion": "Franelilla Niño",
    "cantidad": 1680,
    "valorUnitario": 900,
    "talla": "TALLA 6-12",
    "totalFactura": 1512000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1651-FN-1",
        "nombre": "Cierre Lados",
        "precio": 65,
        "cantidad": 315,
        "valor": 20475
      },
      {
        "id": "FAC-COOLKIDS-1651-FN-2",
        "nombre": "Sesgo De Cuello",
        "precio": 60,
        "cantidad": 1680,
        "valor": 100800
      },
      {
        "id": "FAC-COOLKIDS-1651-FN-3",
        "nombre": "Sesgo Manga",
        "precio": 68,
        "cantidad": 1680,
        "valor": 114240
      },
      {
        "id": "FAC-COOLKIDS-1651-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1680,
        "valor": 110880
      },
      {
        "id": "FAC-COOLKIDS-1651-FN-5",
        "nombre": "Remates",
        "precio": 100,
        "cantidad": 1680,
        "valor": 168000
      },
      {
        "id": "FAC-COOLKIDS-1651-FN-6",
        "nombre": "Despeluze",
        "precio": 123,
        "cantidad": 1680,
        "valor": 206640
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1651-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS Y CIERRE LADOS TALLA 12  4 PAQ",
        "cantidad": 420,
        "valor": 51660,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS Y CIERRE LADOS TALLA 6   3 PAQ",
        "cantidad": 315,
        "valor": 38745,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLOS TALLA 12,6",
        "cantidad": 1680,
        "valor": 110880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-4",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO MANGA  TALLA 12,6",
        "cantidad": 1680,
        "valor": 114240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-5",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO CUELLO TALLA 12,6",
        "cantidad": 1680,
        "valor": 100800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATES",
        "cantidad": 1680,
        "valor": 168000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-7",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE",
        "cantidad": 1680,
        "valor": 206640,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1651-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBRO CIERRE LADOS T12- 4 PAQ  , T6-5PAQ",
        "cantidad": 945,
        "valor": 116235,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1668",
    "facturaNumero": 1668,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Pillama Niño",
    "cantidad": 1782,
    "valorUnitario": 900,
    "talla": "4--8",
    "totalFactura": 1603800,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1668-FN-1",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 225,
        "valor": 20025
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-2",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 174,
        "valor": 14964
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-3",
        "nombre": "Sesgo De Cuello",
        "precio": 60,
        "cantidad": 1782,
        "valor": 106920
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-4",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1782,
        "valor": 114048
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-5",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1782,
        "valor": 117612
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-6",
        "nombre": "Remates",
        "precio": 43,
        "cantidad": 1782,
        "valor": 76626
      },
      {
        "id": "FAC-COOLKIDS-1668-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1782,
        "valor": 151893
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1668-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS 4 PAQ T-4",
        "cantidad": 291,
        "valor": 16878,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGAR  T 8",
        "cantidad": 891,
        "valor": 76626,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA T-8 T-4",
        "cantidad": 1782,
        "valor": 114048,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGAR T4  717 CAMISAS",
        "cantidad": 717,
        "valor": 61662,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-5",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO DE CUELLO T-8 T-4",
        "cantidad": 1782,
        "valor": 106920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS T4  8 PAQ",
        "cantidad": 600,
        "valor": 34800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-7",
        "operativeId": "OP-014",
        "operativeName": "Puki",
        "detalle": "DESPELUSE",
        "cantidad": 1782,
        "valor": 151893,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBROS T 8",
        "cantidad": 891,
        "valor": 51678,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TCIERE T -8",
        "cantidad": 891,
        "valor": 79299,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-10",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO T4- T8",
        "cantidad": 1782,
        "valor": 117612,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-11",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATES",
        "cantidad": 1782,
        "valor": 76626,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-12",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE TALLA 4  9-PAQ",
        "cantidad": 666,
        "valor": 59274,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-13",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERE T 4 3 PAQ",
        "cantidad": 225,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1668-AS-14",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T4- 2 PAQ + 174 CAMISAS",
        "cantidad": 174,
        "valor": 14964,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1675",
    "facturaNumero": 1675,
    "empresa": "COOLKIDS",
    "descripcion": "Buso Traje Niño",
    "cantidad": 1200,
    "valorUnitario": 1500,
    "talla": "6-2-12-16",
    "totalFactura": 1800000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1675-FN-1",
        "nombre": "Cierre De Mangas",
        "precio": 80,
        "cantidad": 300,
        "valor": 24000
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-2",
        "nombre": "Cierre De Lados",
        "precio": 65,
        "cantidad": 300,
        "valor": 19500
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1200,
        "valor": 79200
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-4",
        "nombre": "Dobladillo Mangas",
        "precio": 64,
        "cantidad": 600,
        "valor": 38400
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-5",
        "nombre": "Montar Cuellos",
        "precio": 200,
        "cantidad": 1200,
        "valor": 240000
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-6",
        "nombre": "Pise De Plana Cuellos",
        "precio": 65,
        "cantidad": 1200,
        "valor": 78000
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-7",
        "nombre": "Despeluce",
        "precio": 124,
        "cantidad": 1374,
        "valor": 170376
      },
      {
        "id": "FAC-COOLKIDS-1675-FN-8",
        "nombre": "Manga Cerrada",
        "precio": 100,
        "cantidad": 600,
        "valor": 60000
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1675-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA T 2 T6",
        "cantidad": 600,
        "valor": 38400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO T-2-6-12-16",
        "cantidad": 1200,
        "valor": 79200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA SERADA T12-16",
        "cantidad": 600,
        "valor": 60000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-4",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "SIERE DE MANGA T16 CIERRE LADO T16 ENMANGO T16",
        "cantidad": 900,
        "valor": 103500,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "SIERE DE MANGA T6 CIERRE LADO T6 ENMANGO T6",
        "cantidad": 900,
        "valor": 103500,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERE DE MANGA T2",
        "cantidad": 300,
        "valor": 24000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-7",
        "operativeId": "OP-017",
        "operativeName": "Laura",
        "detalle": "CIERE DE LADO T2",
        "cantidad": 300,
        "valor": 19500,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-8",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE MANGA T12 CIERE LADO T12 ENMANGAR T12",
        "cantidad": 900,
        "valor": 103500,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-9",
        "operativeId": "OP-014",
        "operativeName": "Puki",
        "detalle": "DESPELUZE",
        "cantidad": 1200,
        "valor": 170400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-10",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ENMANGAR T2",
        "cantidad": 300,
        "valor": 60000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-11",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE CUELLO",
        "cantidad": 1200,
        "valor": 78000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1675-AS-12",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "MONTAR CUELLO",
        "cantidad": 1200,
        "valor": 240000,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1676",
    "facturaNumero": 1676,
    "empresa": "COOLKIDS",
    "descripcion": "Pantalon Trage Baño",
    "cantidad": 1200,
    "valorUnitario": 800,
    "talla": "2-6-12-16",
    "totalFactura": 960000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1676-FN-1",
        "nombre": "Tiro",
        "precio": 52,
        "cantidad": 300,
        "valor": 15600
      },
      {
        "id": "FAC-COOLKIDS-1676-FN-2",
        "nombre": "Dobladillo Bota",
        "precio": 160,
        "cantidad": 1200,
        "valor": 192000
      },
      {
        "id": "FAC-COOLKIDS-1676-FN-3",
        "nombre": "Pise De Caucho",
        "precio": 65,
        "cantidad": 1200,
        "valor": 78000
      },
      {
        "id": "FAC-COOLKIDS-1676-FN-4",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1200,
        "valor": 51600
      },
      {
        "id": "FAC-COOLKIDS-1676-FN-5",
        "nombre": "Encauchar",
        "precio": 60,
        "cantidad": 1200,
        "valor": 72000
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1676-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIRRE DE LADO T12 YTIRO T12",
        "cantidad": 600,
        "valor": 45600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIRRE DE LADO T16-6-2YTIRO T16-6-2",
        "cantidad": 900,
        "valor": 136800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO T16-12-6-2 BOTA",
        "cantidad": 1200,
        "valor": 192000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-4",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO T 16-12-6-2",
        "cantidad": 120,
        "valor": 72000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-5",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE DE CAUCHO",
        "cantidad": 1200,
        "valor": 78000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-6",
        "operativeId": "OP-014",
        "operativeName": "Puki",
        "detalle": "DESPELUZE",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1676-AS-7",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE",
        "cantidad": 1200,
        "valor": 51600,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1708",
    "facturaNumero": 1708,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Niño",
    "cantidad": 1735,
    "valorUnitario": 900,
    "talla": "6--",
    "totalFactura": 1561500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1708-FN-1",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1735,
        "valor": 117980
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-2",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1735,
        "valor": 111040
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1735,
        "valor": 95425
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1735,
        "valor": 104100
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-5",
        "nombre": "Remate Cucho",
        "precio": 43,
        "cantidad": 1735,
        "valor": 74605
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-6",
        "nombre": "Pice Caucho",
        "precio": 64,
        "cantidad": 1735,
        "valor": 111040
      },
      {
        "id": "FAC-COOLKIDS-1708-FN-7",
        "nombre": "Despeluse",
        "precio": 106,
        "cantidad": 1735,
        "valor": 183910
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1708-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTERO TRASERO T6",
        "cantidad": 1735,
        "valor": 138800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-2",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE DE PLANA T6",
        "cantidad": 1735,
        "valor": 95425,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO T6",
        "cantidad": 1735,
        "valor": 117980,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-4",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUSE",
        "cantidad": 1735,
        "valor": 183910,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE TIRO T6",
        "cantidad": 1735,
        "valor": 111040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO T6",
        "cantidad": 1735,
        "valor": 104100,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-7",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE CAUCHO T6",
        "cantidad": 1735,
        "valor": 74605,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-8",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE DE CAUCHO T6 7-PAQ",
        "cantidad": 1037,
        "valor": 66368,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-9",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "PISE CAUCHO 5 PAQ",
        "cantidad": 578,
        "valor": 36992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1708-AS-10",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "PISE CAUCHO T-6--12",
        "cantidad": 120,
        "valor": 7680,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1709",
    "facturaNumero": 1709,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Niño",
    "cantidad": 1735,
    "valorUnitario": 900,
    "talla": "00-8",
    "totalFactura": 1561500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1709-FN-1",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1735,
        "valor": 117980
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-2",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1735,
        "valor": 111040
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1735,
        "valor": 95425
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1735,
        "valor": 104100
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-5",
        "nombre": "Remate Cucho",
        "precio": 43,
        "cantidad": 1735,
        "valor": 74605
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-6",
        "nombre": "Pice Caucho",
        "precio": 64,
        "cantidad": 1735,
        "valor": 111040
      },
      {
        "id": "FAC-COOLKIDS-1709-FN-7",
        "nombre": "Despeluse",
        "precio": 106,
        "cantidad": 1735,
        "valor": 183910
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1709-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTERO TRASERO T8",
        "cantidad": 1735,
        "valor": 138800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-2",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA T8",
        "cantidad": 1735,
        "valor": 95425,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO T8",
        "cantidad": 1735,
        "valor": 117980,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-4",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUSE T8",
        "cantidad": 1735,
        "valor": 183910,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO T8",
        "cantidad": 1735,
        "valor": 104100,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-6",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "REMATE CAUCHO T8",
        "cantidad": 1735,
        "valor": 74605,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-7",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE TIRO T8",
        "cantidad": 1735,
        "valor": 111040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1709-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "PISE CAUCHO T8",
        "cantidad": 1735,
        "valor": 111040,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1724",
    "facturaNumero": 1724,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Rollito",
    "cantidad": 3328,
    "valorUnitario": 900,
    "talla": "12-8-6-4",
    "totalFactura": 2995200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1724-FN-1",
        "nombre": "Nmangar",
        "precio": 86,
        "cantidad": 832,
        "valor": 71552
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-2",
        "nombre": "Ciere",
        "precio": 89,
        "cantidad": 832,
        "valor": 74048
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 3328,
        "valor": 212992
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-4",
        "nombre": "Rollito",
        "precio": 60,
        "cantidad": 1664,
        "valor": 99840
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 832,
        "valor": 49920
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 3328,
        "valor": 143104
      },
      {
        "id": "FAC-COOLKIDS-1724-FN-7",
        "nombre": "Despeluze",
        "precio": 80,
        "cantidad": 3328,
        "valor": 266240
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1724-AS-1",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "HOMBRO T12 FAC -1724",
        "cantidad": 832,
        "valor": 48256,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-2",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROT8 FAC-1724",
        "cantidad": 832,
        "valor": 48256,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA FAC 1724",
        "cantidad": 3328,
        "valor": 212992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-4",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO T12 FAC-1724",
        "cantidad": 832,
        "valor": 49920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS T6 FAC-1724",
        "cantidad": 832,
        "valor": 48256,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-6",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO T8 FAC-1724",
        "cantidad": 832,
        "valor": 48256,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-7",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "HOMBROS T4FAC-1724",
        "cantidad": 832,
        "valor": 48256,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-8",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGAR T12-FAC-1724",
        "cantidad": 832,
        "valor": 71552,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-9",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "MANGAR T8-FAC-1724",
        "cantidad": 832,
        "valor": 71552,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGAR T6-FAC-1724",
        "cantidad": 832,
        "valor": 71552,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-11",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T4-FAC-1724",
        "cantidad": 832,
        "valor": 71552,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-12",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE T12-FAC-1724",
        "cantidad": 832,
        "valor": 74048,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-13",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "CIERE T8-FAC-1724",
        "cantidad": 832,
        "valor": 76412,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-14",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO T6-FAC-1724",
        "cantidad": 832,
        "valor": 49920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-15",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO T-4-FAC-1724",
        "cantidad": 832,
        "valor": 49220,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-16",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE T12-8-6-4FAC1724 OSCAR",
        "cantidad": 3328,
        "valor": 143104,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-17",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "ROYITO T-8-PAQ-CELESTE-ROJO",
        "cantidad": 414,
        "valor": 24840,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-18",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ROYITO T-8-PAQ-ROSADO- LILA-FUSIA-OSCA",
        "cantidad": 418,
        "valor": 25080,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-19",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE T--6-4-FAC-1724-OSCA",
        "cantidad": 1664,
        "valor": 148096,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-20",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ROLLITO T-12-FAC-1724-OSCAR",
        "cantidad": 832,
        "valor": 49920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-21",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUSE",
        "cantidad": 3328,
        "valor": 266240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-22",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ROLLITO T-6-4AC-1724-OSCAR",
        "cantidad": 832,
        "valor": 49920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1724-AS-23",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ROLLITO T-4 -FAC1724",
        "cantidad": 832,
        "valor": 49920,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1742",
    "facturaNumero": 1742,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Niño",
    "cantidad": 1388,
    "valorUnitario": 900,
    "talla": "14---",
    "totalFactura": 1249200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1742-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 920,
        "valor": 79120
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1380,
        "valor": 122820
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1380,
        "valor": 88320
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1380,
        "valor": 91080
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1380,
        "valor": 82800
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1380,
        "valor": 59340
      },
      {
        "id": "FAC-COOLKIDS-1742-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1380,
        "valor": 102120
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1742-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBOT-14-FAC-1742-OSCAR",
        "cantidad": 690,
        "valor": 40020,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-2",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBOT-14-FAC-1742-OSCAR",
        "cantidad": 690,
        "valor": 40020,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA-T14-FAC-1742OSCAR",
        "cantidad": 1380,
        "valor": 88320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-4",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "SESGO T14-FAC-1742-OSCAR",
        "cantidad": 1380,
        "valor": 82800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE T14-FAC-1742-OSCAR",
        "cantidad": 1273,
        "valor": 113297,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGA T14-FAC1742-OSCAR-4PAQBLANCO",
        "cantidad": 460,
        "valor": 39560,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "MANGA T14-FAC1742-OSCAR-8REY-NEGRO",
        "cantidad": 920,
        "valor": 79120,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO -T14-FAC-1742OSCAR",
        "cantidad": 1035,
        "valor": 68310,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-9",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE TODO-OSCAR",
        "cantidad": 1380,
        "valor": 59340,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-10",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE",
        "cantidad": 1380,
        "valor": 105408,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-11",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERE T14-FAC-1742-OSCAR-1-PAQ-115",
        "cantidad": 115,
        "valor": 10235,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1742-AS-12",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "DOBBLA-T14-1742-OSCAR-3-PAQ",
        "cantidad": 345,
        "valor": 22770,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1751",
    "facturaNumero": 1751,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Niño",
    "cantidad": 1388,
    "valorUnitario": 900,
    "talla": "10--",
    "totalFactura": 1249200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1751-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 1388,
        "valor": 119368
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 920,
        "valor": 81880
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1388,
        "valor": 88832
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1388,
        "valor": 91608
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1388,
        "valor": 83280
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1388,
        "valor": 59684
      },
      {
        "id": "FAC-COOLKIDS-1751-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1388,
        "valor": 102712
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1751-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGA-T10-REY-BLANCO-8-PAQ-OSCAR",
        "cantidad": 920,
        "valor": 79120,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-2",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBROS-T10-FAC-1751-OSCAR",
        "cantidad": 1388,
        "valor": 80504,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA MANGA-T10-FAC-1751-OSCAR",
        "cantidad": 1388,
        "valor": 88832,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-4",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "SESGO-T10-FAC-1751-4-PAQ-OSCAR",
        "cantidad": 460,
        "valor": 27600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T10-FAC1751-OSCAR-8-PAQ",
        "cantidad": 920,
        "valor": 81880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA -T10-FAC-1751-OSCAR",
        "cantidad": 1388,
        "valor": 91608,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T10-FAC1751-OSCAR-4-PAQ",
        "cantidad": 460,
        "valor": 40940,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-8",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "MANGA-T10REY-FAC-1751-4PAQ-OSCA",
        "cantidad": 460,
        "valor": 39560,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-9",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO-T10-FAC-1751-8-PAQ-OSCAR",
        "cantidad": 920,
        "valor": 55200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-10",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUSE",
        "cantidad": 1388,
        "valor": 104592,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1751-AS-11",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE T10-FAC-1751 OSCAR",
        "cantidad": 1388,
        "valor": 59684,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1752",
    "facturaNumero": 1752,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Niño",
    "cantidad": 3435,
    "valorUnitario": 900,
    "talla": "1-2-3-",
    "totalFactura": 3091500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1752-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 1145,
        "valor": 98470
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1145,
        "valor": 101905
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 3435,
        "valor": 219840
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 3435,
        "valor": 226710
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 3435,
        "valor": 206100
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 3435,
        "valor": 147705
      },
      {
        "id": "FAC-COOLKIDS-1752-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 3435,
        "valor": 254190
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1752-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBRO-T2-FAC-1752-OSCAR",
        "cantidad": 1145,
        "valor": 66410,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-2",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBRO-T3-FAC-1752-OSCAR",
        "cantidad": 1145,
        "valor": 66410,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBRO-T-1-FAC1752",
        "cantidad": 1145,
        "valor": 66410,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T3-2-1-OSCAR-FAC-1752-M",
        "cantidad": 3435,
        "valor": 219840,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T-3-OSCAR-FAC1752",
        "cantidad": 1145,
        "valor": 98470,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-2-1-OSCAR-FAC1752",
        "cantidad": 2290,
        "valor": 196940,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T2-OSCAR-FAC-1752-",
        "cantidad": 1145,
        "valor": 101905,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-8",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE",
        "cantidad": 3435,
        "valor": 254270,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T1-OSCAR-FAC-1752-",
        "cantidad": 1145,
        "valor": 101905,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T3-OSCAR-FAC-1752",
        "cantidad": 1145,
        "valor": 101905,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-11",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T3-2-1-OSCAR-FAC-1752-ABAJO",
        "cantidad": 3435,
        "valor": 226710,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-T1-2-3-OSCAR",
        "cantidad": 3435,
        "valor": 147705,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-13",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO-T-3-REY-FAC-1752-OSCAR",
        "cantidad": 994,
        "valor": 59640,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-14",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "SESGO-T--BARIOS-FAC-1752-OSCAR",
        "cantidad": 2243,
        "valor": 134580,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1752-AS-15",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO-OSCAR-FAC1752",
        "cantidad": 198,
        "valor": 11800,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1763",
    "facturaNumero": 1763,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Niño",
    "cantidad": 2680,
    "valorUnitario": 900,
    "talla": "10-6-",
    "totalFactura": 2412000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1763-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 1340,
        "valor": 115240
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1340,
        "valor": 119260
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 2680,
        "valor": 171520
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 2680,
        "valor": 176880
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1340,
        "valor": 80400
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 2680,
        "valor": 115240
      },
      {
        "id": "FAC-COOLKIDS-1763-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 2680,
        "valor": 198320
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1763-AS-1",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBRO-T-10-OSCAR-FAC-1763",
        "cantidad": 1340,
        "valor": 77720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBRO-T-6-OSCAR-FAC-1763",
        "cantidad": 1340,
        "valor": 77720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T-6-10-OSCAR-FAC-1763",
        "cantidad": 2680,
        "valor": 171520,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-10-OSCAR-FAC-1763-",
        "cantidad": 1340,
        "valor": 115240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T-6-OSCAR-FAC-1763-",
        "cantidad": 1340,
        "valor": 115240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-6",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OSCAR",
        "cantidad": 2680,
        "valor": 198320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T10-FAC-1763-OSCAR",
        "cantidad": 1340,
        "valor": 119260,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-8",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO-T6-FAC-1763-4-PAQ-OSCAR",
        "cantidad": 420,
        "valor": 25200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-9",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-T10-6-FAC-1763-OSCAR",
        "cantidad": 2680,
        "valor": 115240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-10",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO-T6-FAC-1763-4-PAQ-OSCAR",
        "cantidad": 420,
        "valor": 25200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-11",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO-T6-FAC-1763-3-PAQ-OSCAR",
        "cantidad": 315,
        "valor": 19020,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-12",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-T10-FAC-1763--OSCAR",
        "cantidad": 1340,
        "valor": 80400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-13",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T-6-10-OSCAR-FAC-1763-",
        "cantidad": 2680,
        "valor": 176880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-14",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO-T-6-OSCAR-FAC-1753",
        "cantidad": 183,
        "valor": 10980,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-15",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T6-FAC-1763-OSCAR-9-PAQ",
        "cantidad": 1025,
        "valor": 91225,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1763-AS-16",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T-6-FAC-1763-OSCAR-3PAQ",
        "cantidad": 315,
        "valor": 28035,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1773",
    "facturaNumero": 1773,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta-niño",
    "cantidad": 1620,
    "valorUnitario": 900,
    "talla": "4-12-",
    "totalFactura": 1458000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1773-FN-1",
        "nombre": "Remate-Tiro",
        "precio": 64,
        "cantidad": 1620,
        "valor": 103680
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1620,
        "valor": 110160
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-3",
        "nombre": "Pise-Plana",
        "precio": 55,
        "cantidad": 1620,
        "valor": 89100
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-4",
        "nombre": "Encauchar",
        "precio": 60,
        "cantidad": 1620,
        "valor": 97200
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-5",
        "nombre": "Remate-Caucho",
        "precio": 43,
        "cantidad": 1620,
        "valor": 69660
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-6",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1620,
        "valor": 105300
      },
      {
        "id": "FAC-COOLKIDS-1773-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 1620,
        "valor": 170100
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1773-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELAN-TRASERO-FAC-1773-OSCAR-T-4",
        "cantidad": 810,
        "valor": 64800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELAN-TRASERO-FAC-1773-OSCAR-T-12",
        "cantidad": 810,
        "valor": 64800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-PLANA-FAC-1773-OSCAR",
        "cantidad": 1620,
        "valor": 89100,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-FAC-1773-T-4-OSCAR",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-5",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "DOBLA-FAC-1773-T-4-OSCAR",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "DOBLA-FAC-1773-T-12-OSCAR",
        "cantidad": 810,
        "valor": 55080,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-7",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-TIRO-T-12-4-OSCAR-FAC-1773",
        "cantidad": 1620,
        "valor": 103680,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-8",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-T-12-4-OSCAR-FAC-1773",
        "cantidad": 1620,
        "valor": 105300,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO-FAC-1773-OSCAR",
        "cantidad": 1620,
        "valor": 97200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-10",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUSE-1773-OSCAR",
        "cantidad": 1620,
        "valor": 170100,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1773-AS-11",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "REMATE-CAUCHO-T-12-4-OSCAR-FAC-1773",
        "cantidad": 1620,
        "valor": 69660,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1783",
    "facturaNumero": 1783,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Rollito",
    "cantidad": 1744,
    "valorUnitario": 900,
    "talla": "4-10-",
    "totalFactura": 1569600,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1783-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 872,
        "valor": 74992
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 872,
        "valor": 77608
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1744,
        "valor": 111616
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-4",
        "nombre": "Rollito",
        "precio": 60,
        "cantidad": 872,
        "valor": 52320
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 872,
        "valor": 52320
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1744,
        "valor": 74992
      },
      {
        "id": "FAC-COOLKIDS-1783-FN-7",
        "nombre": "Despeluze",
        "precio": 80,
        "cantidad": 1744,
        "valor": 139520
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1783-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS-T10-OSCAR-1783-",
        "cantidad": 872,
        "valor": 50576,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-FAC-1783-T-10-4-OSCAR",
        "cantidad": 1744,
        "valor": 111616,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-3",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OSCAR-1783",
        "cantidad": 1744,
        "valor": 139520,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-4",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBROS-T-4-OSCAR-1783-6-PAQ",
        "cantidad": 432,
        "valor": 25056,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-5",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS-T-4-OSCAR-1783-6-PAQ",
        "cantidad": 432,
        "valor": 25056,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGADO-T-10-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 74992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGADO-T-4-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 74992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T-10-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 77608,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-9",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGANDO-6-PAQ-T10-FAC-1783-OSCAR",
        "cantidad": 438,
        "valor": 26280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-10",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGANDO-6-PAQ-T10-FAC-1783-OSCAR",
        "cantidad": 438,
        "valor": 26280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGANDO-T-6-FAC1783-OSCAR-",
        "cantidad": 872,
        "valor": 52320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-12",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ROLLITO-T10-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 52320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-13",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-T-10-4-FAC-1783-OSCAR",
        "cantidad": 1744,
        "valor": 74992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-14",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "ROLLITO-T10-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 52320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1783-AS-15",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T-6-FAC-1783-OSCAR",
        "cantidad": 872,
        "valor": 77608,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1793",
    "facturaNumero": 1793,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa-niño",
    "cantidad": 1110,
    "valorUnitario": 900,
    "talla": "12--6",
    "totalFactura": 999000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1793-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 1110,
        "valor": 95460
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 777,
        "valor": 69153
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1110,
        "valor": 71040
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1110,
        "valor": 73260
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1110,
        "valor": 66600
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1110,
        "valor": 47730
      },
      {
        "id": "FAC-COOLKIDS-1793-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1110,
        "valor": 82140
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1793-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBRO-OSCAR-FAC-1793-T12",
        "cantidad": 387,
        "valor": 22446,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-OSCAR-FAC-1793-T12",
        "cantidad": 192,
        "valor": 11136,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBRO-OSCAR-FAC-1793-T6",
        "cantidad": 333,
        "valor": 19314,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T12-FAC-1793-OSCAR",
        "cantidad": 404,
        "valor": 34744,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T12-FAC-1793-OSCAR",
        "cantidad": 387,
        "valor": 33282,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-T-12-OSCAR-FAC-1793",
        "cantidad": 1110,
        "valor": 66600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T12-FAC-1793-OSCAR",
        "cantidad": 1110,
        "valor": 71040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-8",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OSCAR-FAC1793-",
        "cantidad": 1110,
        "valor": 80124,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-9",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-T-12-4-OSCAR-1793",
        "cantidad": 1110,
        "valor": 47730,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-10",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T-12-6-FAC1793-OSCAR",
        "cantidad": 777,
        "valor": 69153,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "CIERE-T-6-FAC-1793-OSCAR",
        "cantidad": 333,
        "valor": 29637,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-12",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-T12-FAC-1793-OSCAR",
        "cantidad": 1110,
        "valor": 73260,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-13",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T6-FAC-1793-OSCAR",
        "cantidad": 333,
        "valor": 28638,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1793-AS-14",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS-OSCAR-1793-FAC-T12",
        "cantidad": 212,
        "valor": 12296,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1802",
    "facturaNumero": 1802,
    "empresa": "COOLKIDS",
    "descripcion": "Vestido",
    "cantidad": 800,
    "valorUnitario": 1100,
    "talla": "TODAS",
    "totalFactura": 880000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1802-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 800,
        "valor": 68800
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 200,
        "valor": 17800
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 800,
        "valor": 51200
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 800,
        "valor": 52800
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-5",
        "nombre": "Cuello",
        "precio": 200,
        "cantidad": 800,
        "valor": 160000
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-6",
        "nombre": "Pise-Cuello",
        "precio": 60,
        "cantidad": 800,
        "valor": 48000
      },
      {
        "id": "FAC-COOLKIDS-1802-FN-7",
        "nombre": "Despeluze",
        "precio": 37,
        "cantidad": 800,
        "valor": 29600
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1802-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-FAC-1802-OSCAR-VESTIDO-MANGA",
        "cantidad": 800,
        "valor": 51200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-FAC-1802-OSCAR-VESTIDO-ABAJO",
        "cantidad": 800,
        "valor": 52800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS-FAC-1802-OSCAR-T-8-",
        "cantidad": 200,
        "valor": 11600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-FAC-1802-T-8",
        "cantidad": 200,
        "valor": 17200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CERO-FAC-1802-OSCAR-T8-",
        "cantidad": 200,
        "valor": 17800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE FAC-1802- OSCAR T10",
        "cantidad": 200,
        "valor": 17800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE FAC-1802- OSCAR T14",
        "cantidad": 200,
        "valor": 17800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-8",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS-FAC-1802-OSCAR-T-12",
        "cantidad": 200,
        "valor": 11600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-9",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-FAC-1802-T-12",
        "cantidad": 200,
        "valor": 17200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CERO-FAC-1802-OSCAR-T-12-",
        "cantidad": 200,
        "valor": 17800,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "CUELLO-OSCAR-FAC-1802-VESTIDO",
        "cantidad": 800,
        "valor": 160000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-12",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-CUELLO-OSCAR-FAC-1802-VESTIDO",
        "cantidad": 800,
        "valor": 48000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-13",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DEZPELUZE-OSCAR",
        "cantidad": 800,
        "valor": 29600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-14",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-T-10-FAC-1802-OSCAR-VESTIDO",
        "cantidad": 200,
        "valor": 11600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-15",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-10-FAC-1802-OSCAR-VESTIDO",
        "cantidad": 200,
        "valor": 17200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-16",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-T14-FAC-1802-OSCAR-VESTIDO",
        "cantidad": 200,
        "valor": 11600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1802-AS-17",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-14-FAC-1802-OSCAR-VESTIDO",
        "cantidad": 200,
        "valor": 17200,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1803",
    "facturaNumero": 1803,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Niño",
    "cantidad": 2870,
    "valorUnitario": 900,
    "talla": "04--08--14",
    "totalFactura": 2583000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1803-FN-1",
        "nombre": "Remate-Tiro",
        "precio": 64,
        "cantidad": 1030,
        "valor": 65920
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 2870,
        "valor": 195160
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-3",
        "nombre": "Pise-Plana",
        "precio": 55,
        "cantidad": 2870,
        "valor": 157850
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-4",
        "nombre": "Encauchar",
        "precio": 60,
        "cantidad": 2870,
        "valor": 172200
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-5",
        "nombre": "Remate-Caucho",
        "precio": 43,
        "cantidad": 2870,
        "valor": 123410
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-6",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 2870,
        "valor": 186550
      },
      {
        "id": "FAC-COOLKIDS-1803-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 2870,
        "valor": 301350
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1803-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELAN-TRASER TALLA 4 OSCAR-FAC-1803",
        "cantidad": 920,
        "valor": 73600,
        "prestamos": 220000
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELAN-TRASER TALLA 14 OSCAR-FAC1803",
        "cantidad": 920,
        "valor": 73600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHAR T 4-8-14 OSCAR-FAC-1803",
        "cantidad": 2870,
        "valor": 172200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-4",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-CAUCHO-OSCAR-FAC-1803",
        "cantidad": 2870,
        "valor": 123410,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANT-TRASER- T8 OSCAR -FAC-1803",
        "cantidad": 846,
        "valor": 67680,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADI-OSCAR-PANTALONETA-FAC1803",
        "cantidad": 2870,
        "valor": 195160,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-7",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-PLANA-OSCAR-FAC-1803-",
        "cantidad": 2870,
        "valor": 157850,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-8",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "DELAN TRASERO-T8-OSCAR-FAC-1803-",
        "cantidad": 184,
        "valor": 15854,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-9",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIROS-OSCAR-T-4-FAC-1803-",
        "cantidad": 920,
        "valor": 58880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-10",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OSCAR-FAC-1803",
        "cantidad": 2870,
        "valor": 300216,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-11",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIROS-OSCAR-T-14-FAC-1803-",
        "cantidad": 920,
        "valor": 58880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-12",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIROS-OSCAR-T-8-FAC-4-1803-T4-184",
        "cantidad": 1030,
        "valor": 65920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-13",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE-CAUCHO-OSCAR-FAC-1803-",
        "cantidad": 697,
        "valor": 45305,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1803-AS-14",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-OSCAR-FAC-1803-",
        "cantidad": 2173,
        "valor": 141245,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1811",
    "facturaNumero": 1811,
    "empresa": "COOLKIDS",
    "descripcion": "Short Unicolor",
    "cantidad": 4248,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 3823200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1811-FN-1",
        "nombre": "Delantero",
        "precio": 43,
        "cantidad": 4248,
        "valor": 182664
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-2",
        "nombre": "Tiro",
        "precio": 52.7,
        "cantidad": 4248,
        "valor": 223869.6
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-3",
        "nombre": "Pise Plana 1",
        "precio": 52.7,
        "cantidad": 4248,
        "valor": 223869.6
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-4",
        "nombre": "Pise Plana 2",
        "precio": 60,
        "cantidad": 4248,
        "valor": 254880
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-5",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 4248,
        "valor": 254880
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 4248,
        "valor": 182664
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-7",
        "nombre": "Sesgo",
        "precio": 100,
        "cantidad": 4248,
        "valor": 424800
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-8",
        "nombre": "Pise De Caucho",
        "precio": 65,
        "cantidad": 4248,
        "valor": 276120
      },
      {
        "id": "FAC-COOLKIDS-1811-FN-9",
        "nombre": "Despeluze",
        "precio": 20.6,
        "cantidad": 4248,
        "valor": 87508.8
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1811-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TRASERO-T-4-10-FAC-1811-OSCAR-",
        "cantidad": 1416,
        "valor": 60888,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTERO-T-4-10-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 60888,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-T-4-10-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 74624,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TRASERO-T-8-12-FAC-1811-OSCAR-",
        "cantidad": 1416,
        "valor": 60888,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTERO-T-8-12-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 60888,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO-T-8-12-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 74624,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "TRASERO-T-6-FAC-1811-OSCAR-",
        "cantidad": 708,
        "valor": 30444,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DELANTERO-T6-FAC-1811-OSCAR",
        "cantidad": 708,
        "valor": 30444,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-9",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "TIRO-T-6-FAC-1811-OSCAR",
        "cantidad": 708,
        "valor": 37312,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-10",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TRASERO-T-14-FAC-1811-OSCAR-",
        "cantidad": 708,
        "valor": 30444,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-11",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTERO-14-FAC-1811-OSCAR",
        "cantidad": 708,
        "valor": 30444,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-12",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TIRO-T-14-FAC-1811-OSCAR",
        "cantidad": 708,
        "valor": 37312,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-13",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-PLANA-1-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 74623,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-14",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "SESGO-FAC-1811-OSCAR-1-PATA",
        "cantidad": 760,
        "valor": 38000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-15",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO-FAC-1811-OSCAR-",
        "cantidad": 4248,
        "valor": 254880,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-16",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO-FAC-1811-OSCAR-1-PATA",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-17",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO-FAC-1811-OSCAR-1-PATA",
        "cantidad": 401,
        "valor": 20050,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-18",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "SESGO-FAC-1811-OSCAR-2-PATA",
        "cantidad": 34,
        "valor": 3400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-19",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE-CAUCHO-OSCAR-FAC-1811",
        "cantidad": 4248,
        "valor": 182664,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-20",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "SESGO-FAC-1811-OSCAR-1PATA",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-21",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "SESGO-FAC-1811-OSCAR-1PATA",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-22",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DEZPELUSE--OSACR",
        "cantidad": 4248,
        "valor": 87509,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-23",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-PLANA-1-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 74623,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1811-AS-24",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-PLANA-1-FAC-1811-OSCAR",
        "cantidad": 1416,
        "valor": 74623,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1831",
    "facturaNumero": 1831,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa-pillama",
    "cantidad": 1506,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1355400,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1831-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 753,
        "valor": 64758
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 753,
        "valor": 67017
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1506,
        "valor": 96384
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1506,
        "valor": 99396
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1506,
        "valor": 90360
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1506,
        "valor": 64758
      },
      {
        "id": "FAC-COOLKIDS-1831-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1506,
        "valor": 111444
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1831-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-T8-OSCAR-FAC-1831",
        "cantidad": 753,
        "valor": 43674,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T8-OSCAR-FAC-1831",
        "cantidad": 753,
        "valor": 64758,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-3",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "HOMBRO-T4-OSCAR-FAC-1831",
        "cantidad": 753,
        "valor": 43674,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T4-OSCAR-FAC-1831",
        "cantidad": 753,
        "valor": 64758,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-MANGA-OSCAR-T-8-4-FAC-1831",
        "cantidad": 1506,
        "valor": 96384,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-ABAJO-OSCAR-T-8-4-FAC-1831",
        "cantidad": 1506,
        "valor": 99396,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-OSCAR-FAC1831-T8-4",
        "cantidad": 1506,
        "valor": 90360,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-OSCAR-FAC-1831-T-4",
        "cantidad": 753,
        "valor": 67017,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-9",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUZE",
        "cantidad": 1506,
        "valor": 111444,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-10",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATES-OSCAR-1831-",
        "cantidad": 1506,
        "valor": 64758,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1831-AS-11",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-OSCAR-FAC-1831-T-8",
        "cantidad": 753,
        "valor": 67017,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1844",
    "facturaNumero": 1844,
    "empresa": "COOLKIDS",
    "descripcion": "Chor-rib",
    "cantidad": 1920,
    "valorUnitario": 900,
    "talla": "TODA",
    "totalFactura": 1728000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1844-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 50,
        "cantidad": 1920,
        "valor": 96000
      },
      {
        "id": "FAC-COOLKIDS-1844-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 1920,
        "valor": 153600
      },
      {
        "id": "FAC-COOLKIDS-1844-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1920,
        "valor": 124800
      },
      {
        "id": "FAC-COOLKIDS-1844-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 1920,
        "valor": 115200
      },
      {
        "id": "FAC-COOLKIDS-1844-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1920,
        "valor": 82560
      },
      {
        "id": "FAC-COOLKIDS-1844-FN-6",
        "nombre": "Despeluze",
        "precio": 162,
        "cantidad": 1920,
        "valor": 311040
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1844-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTRASERO-FAC-1844-T--6-12-OSCAR",
        "cantidad": 640,
        "valor": 51200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO-FAC-1844-T--6-12-OSCAR-",
        "cantidad": 640,
        "valor": 32000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO--OSCAR-FAC1844",
        "cantidad": 1920,
        "valor": 153600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTRASERO-FAC-1844-T-4-8-OSCAR",
        "cantidad": 640,
        "valor": 51200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-FAC-1844-T-8-4-OSCAR-",
        "cantidad": 640,
        "valor": 32000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTRASERO-FAC-1844-T-14-10-OSCAR",
        "cantidad": 640,
        "valor": 51200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TIRO-FAC-1844-T-14-10-OSCAR-",
        "cantidad": 640,
        "valor": 32000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO-OSCAR-FAC-1844",
        "cantidad": 1920,
        "valor": 115200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-9",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-FAC-1844-OSCAR",
        "cantidad": 960,
        "valor": 62400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "REMATE-CAUCHO-OSCAR-FAC-1844",
        "cantidad": 1920,
        "valor": 82560,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-11",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUZE-OSCAR-FAC-1844",
        "cantidad": 1920,
        "valor": 311040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1844-AS-12",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "PISE-CAUCHO-FAC-1844-OSCAR",
        "cantidad": 960,
        "valor": 62400,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1845",
    "facturaNumero": 1845,
    "empresa": "COOLKIDS",
    "descripcion": "Blusa-tira-rib",
    "cantidad": 1920,
    "valorUnitario": 900,
    "talla": "TODA",
    "totalFactura": 1728000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1845-FN-1",
        "nombre": "Sesgo-Cuello",
        "precio": 60,
        "cantidad": 1920,
        "valor": 115200
      },
      {
        "id": "FAC-COOLKIDS-1845-FN-2",
        "nombre": "Sesgo Tira",
        "precio": 150,
        "cantidad": 1920,
        "valor": 288000
      },
      {
        "id": "FAC-COOLKIDS-1845-FN-3",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1920,
        "valor": 126720
      },
      {
        "id": "FAC-COOLKIDS-1845-FN-4",
        "nombre": "Remates-Lado",
        "precio": 70,
        "cantidad": 1920,
        "valor": 134400
      },
      {
        "id": "FAC-COOLKIDS-1845-FN-5",
        "nombre": "Despeluze",
        "precio": 94,
        "cantidad": 1920,
        "valor": 180480
      },
      {
        "id": "FAC-COOLKIDS-1845-FN-6",
        "nombre": "Unir-Sesgo",
        "precio": 35,
        "cantidad": 1920,
        "valor": 67200
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1845-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERE- LADO-FAC-1845-T-12-6-OSCAR",
        "cantidad": 640,
        "valor": 41600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE- LADO-FAC-1845-T-4-8-OSCAR",
        "cantidad": 640,
        "valor": 41600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE- LADO-FAC-1845-T-14-10--OSCAR",
        "cantidad": 640,
        "valor": 41600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-FAC-1845-ABAJO-OSCAR",
        "cantidad": 1920,
        "valor": 126720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-FAC-1845-OSCAR-CUELLO",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE-LADO-FAC1845-OSCAR",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE           DESPELUZE",
        "cantidad": 1920,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1845-AS-8",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR SESGO",
        "cantidad": 1920,
        "valor": 67200,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1842",
    "facturaNumero": 1842,
    "empresa": "COOLKIDS",
    "descripcion": "Pantalon-rib",
    "cantidad": 1404,
    "valorUnitario": 900,
    "talla": "TODAS",
    "totalFactura": 1263600,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1842-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 95,
        "cantidad": 1404,
        "valor": 133380
      },
      {
        "id": "FAC-COOLKIDS-1842-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 1404,
        "valor": 112320
      },
      {
        "id": "FAC-COOLKIDS-1842-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1404,
        "valor": 91260
      },
      {
        "id": "FAC-COOLKIDS-1842-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 1404,
        "valor": 84240
      },
      {
        "id": "FAC-COOLKIDS-1842-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1404,
        "valor": 60372
      },
      {
        "id": "FAC-COOLKIDS-1842-FN-6",
        "nombre": "Despeluze",
        "precio": 117,
        "cantidad": 1404,
        "valor": 164268
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1842-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO-RIB-CHOR-OSCAR-FAC-1842",
        "cantidad": 1404,
        "valor": 84240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTRASERO-FAC-1842-OSCAR-T-8-4-14",
        "cantidad": 702,
        "valor": 56160,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-FAC-1842-OSCAR-T8-4-14-",
        "cantidad": 702,
        "valor": 44460,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTRASERO-FAC-1842-OSCAR-T-12-10-6",
        "cantidad": 702,
        "valor": 56160,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO-FAC-1842-OSCAR-T8-4-14-",
        "cantidad": 702,
        "valor": 44460,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-FAC1842-OSCAR",
        "cantidad": 1404,
        "valor": 112320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-7",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE-PANTALON-FAC1842",
        "cantidad": 1404,
        "valor": 60372,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-8",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 1404,
        "valor": 164268,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1842-AS-9",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "PISE CAUCHO-RIB",
        "cantidad": 1404,
        "valor": 91260,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1843",
    "facturaNumero": 1843,
    "empresa": "COOLKIDS",
    "descripcion": "Blusa-tiras Rib",
    "cantidad": 1404,
    "valorUnitario": 900,
    "talla": "TODAS",
    "totalFactura": 1263600,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1843-FN-1",
        "nombre": "Sesgo-Cuello",
        "precio": 60,
        "cantidad": 1404,
        "valor": 84240
      },
      {
        "id": "FAC-COOLKIDS-1843-FN-2",
        "nombre": "Sesgo Tira",
        "precio": 120,
        "cantidad": 1404,
        "valor": 168480
      },
      {
        "id": "FAC-COOLKIDS-1843-FN-3",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1404,
        "valor": 92664
      },
      {
        "id": "FAC-COOLKIDS-1843-FN-4",
        "nombre": "Remates-Lado",
        "precio": 70,
        "cantidad": 1404,
        "valor": 98280
      },
      {
        "id": "FAC-COOLKIDS-1843-FN-5",
        "nombre": "Despeluze",
        "precio": 124,
        "cantidad": 1404,
        "valor": 174096
      },
      {
        "id": "FAC-COOLKIDS-1843-FN-6",
        "nombre": "Unir Sesgo",
        "precio": 35,
        "cantidad": 1040,
        "valor": 36400
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1843-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-FAC-1843",
        "cantidad": null,
        "valor": 92664,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-2",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERE-LADO-OSCAR-TIRA-FAC-1843-RIB",
        "cantidad": 1040,
        "valor": 91250,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR-SESGO-OSCAR-RIB",
        "cantidad": 1040,
        "valor": 49140,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-4",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SEGO-TIRA-OSCAR",
        "cantidad": 1404,
        "valor": 168480,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SEGO-CUELLO",
        "cantidad": 1404,
        "valor": 84240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE TIRA-OSCAR-RIB",
        "cantidad": 1404,
        "valor": 98280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1843-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 1404,
        "valor": 174106,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1866",
    "facturaNumero": 1866,
    "empresa": "COOLKIDS",
    "descripcion": "Pantalon Pillama",
    "cantidad": 2196,
    "valorUnitario": 900,
    "talla": "TODAS",
    "totalFactura": 1976400,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1866-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 95,
        "cantidad": 732,
        "valor": 69540
      },
      {
        "id": "FAC-COOLKIDS-1866-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 2196,
        "valor": 175680
      },
      {
        "id": "FAC-COOLKIDS-1866-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 2196,
        "valor": 142740
      },
      {
        "id": "FAC-COOLKIDS-1866-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 2196,
        "valor": 131760
      },
      {
        "id": "FAC-COOLKIDS-1866-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 2196,
        "valor": 94428
      },
      {
        "id": "FAC-COOLKIDS-1866-FN-6",
        "nombre": "Despeluze",
        "precio": 117,
        "cantidad": 2196,
        "valor": 256932
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1866-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO-TIRO-14-4",
        "cantidad": 732,
        "valor": 58560,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERE--14--4",
        "cantidad": 732,
        "valor": 69540,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-TIRO---12--6",
        "cantidad": 732,
        "valor": 58560,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE--12--6",
        "cantidad": 732,
        "valor": 69540,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "TIRO-TIRO-10",
        "cantidad": 366,
        "valor": 29280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERE-10",
        "cantidad": 366,
        "valor": 34770,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 2196,
        "valor": 175680,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-8",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE-CAUCHO",
        "cantidad": 366,
        "valor": 23790,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO",
        "cantidad": 2196,
        "valor": 131760,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-10",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE",
        "cantidad": 2196,
        "valor": 94428,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-11",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 2196,
        "valor": 266082,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "TIRO CIERE-8",
        "cantidad": 366,
        "valor": 64050,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1866-AS-13",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE-CAUCHO-T",
        "cantidad": 1830,
        "valor": 109800,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1884",
    "facturaNumero": 1884,
    "empresa": "COOLKIDS",
    "descripcion": "Chor-niño",
    "cantidad": 1488,
    "valorUnitario": 900,
    "talla": "6-10-12-14-",
    "totalFactura": 1339200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1884-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 52.7,
        "cantidad": 1488,
        "valor": 78417.6
      },
      {
        "id": "FAC-COOLKIDS-1884-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 1488,
        "valor": 119040
      },
      {
        "id": "FAC-COOLKIDS-1884-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1488,
        "valor": 96720
      },
      {
        "id": "FAC-COOLKIDS-1884-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 1488,
        "valor": 89280
      },
      {
        "id": "FAC-COOLKIDS-1884-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1488,
        "valor": 63984
      },
      {
        "id": "FAC-COOLKIDS-1884-FN-6",
        "nombre": "Despeluze",
        "precio": 159.3,
        "cantidad": 1488,
        "valor": 237038.40000000002
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1884-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO",
        "cantidad": 1488,
        "valor": 89280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "BOTA",
        "cantidad": 1488,
        "valor": 119040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-3",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE CAUCHO",
        "cantidad": 1488,
        "valor": 96720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO",
        "cantidad": 1488,
        "valor": 119040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE",
        "cantidad": 1488,
        "valor": 78418,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-6",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1488,
        "valor": 63984,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1884-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 1488,
        "valor": 237038,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1880",
    "facturaNumero": 1880,
    "empresa": "COOLKIDS",
    "descripcion": "Chor Niña",
    "cantidad": 1164,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1047600,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1880-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 52.7,
        "cantidad": 1164,
        "valor": 61342.8
      },
      {
        "id": "FAC-COOLKIDS-1880-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 1164,
        "valor": 93120
      },
      {
        "id": "FAC-COOLKIDS-1880-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1164,
        "valor": 75660
      },
      {
        "id": "FAC-COOLKIDS-1880-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 1164,
        "valor": 69840
      },
      {
        "id": "FAC-COOLKIDS-1880-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1164,
        "valor": 50052
      },
      {
        "id": "FAC-COOLKIDS-1880-FN-6",
        "nombre": "Despeluze",
        "precio": 159.3,
        "cantidad": 1164,
        "valor": 185425.2
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1880-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO",
        "cantidad": 1164,
        "valor": 69840,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "BOTA",
        "cantidad": 1164,
        "valor": 93120,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-3",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE",
        "cantidad": 1164,
        "valor": 75660,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELAN",
        "cantidad": 1164,
        "valor": 93120,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO",
        "cantidad": 1164,
        "valor": 61343,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-6",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1164,
        "valor": 50052,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1880-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 1164,
        "valor": 185425,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1887",
    "facturaNumero": 1887,
    "empresa": "COOLKIDS",
    "descripcion": "Pantalon Pillama",
    "cantidad": 753,
    "valorUnitario": 900,
    "talla": "1900-01-06T00:00:00",
    "totalFactura": 677700,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1887-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 95,
        "cantidad": 753,
        "valor": 71535
      },
      {
        "id": "FAC-COOLKIDS-1887-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 753,
        "valor": 60240
      },
      {
        "id": "FAC-COOLKIDS-1887-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 753,
        "valor": 48945
      },
      {
        "id": "FAC-COOLKIDS-1887-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 753,
        "valor": 45180
      },
      {
        "id": "FAC-COOLKIDS-1887-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 753,
        "valor": 32379
      },
      {
        "id": "FAC-COOLKIDS-1887-FN-6",
        "nombre": "Despeluze",
        "precio": 117,
        "cantidad": 753,
        "valor": 88101
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1887-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTRASER",
        "cantidad": 753,
        "valor": 60240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TIRO",
        "cantidad": 753,
        "valor": 71535,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO",
        "cantidad": 753,
        "valor": 45180,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "BOTA",
        "cantidad": 753,
        "valor": 60240,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE",
        "cantidad": 753,
        "valor": 32379,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-6",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "PISE",
        "cantidad": 753,
        "valor": 48945,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1887-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 753,
        "valor": 88101,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-1892",
    "facturaNumero": 1892,
    "empresa": "COOLKIDS",
    "descripcion": "Bluson Dama",
    "cantidad": 900,
    "valorUnitario": 1500,
    "talla": "UNICA",
    "totalFactura": 1350000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-1892-FN-1",
        "nombre": "Manga",
        "precio": 130,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-1892-FN-2",
        "nombre": "Ciere",
        "precio": 100,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-1892-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": null,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-1892-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": null,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-1892-FN-5",
        "nombre": "Cuello",
        "precio": 200,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-1892-FN-6",
        "nombre": "Pise Plana 1-- 2",
        "precio": null,
        "cantidad": null,
        "valor": 0
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-1892-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO BLUSON DAMA",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1892-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CERO BLUSON DAMA",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1892-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1892-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1892-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "MONTO CUELLO",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-1892-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA  1--2-",
        "cantidad": 900,
        "valor": null,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2000",
    "facturaNumero": 2000,
    "empresa": "COOLKIDS",
    "descripcion": "Blusa Niña",
    "cantidad": 2328,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 2095200,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2000-FN-1",
        "nombre": "Enmngar",
        "precio": 86,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-2",
        "nombre": "Sesgo Cuello",
        "precio": 60,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-3",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1164,
        "valor": 103596
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2000-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 2328,
        "valor": 172272
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2000-AS-1",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 2328,
        "valor": 172272,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-2",
        "operativeId": "OP-015",
        "operativeName": "Rosalin",
        "detalle": "HOMBROS TALLA 14",
        "cantidad": 1164,
        "valor": 67512,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-3",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "HOMBROS TALLA 4",
        "cantidad": 1164,
        "valor": 67512,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-4",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE TALLA 14",
        "cantidad": 1164,
        "valor": 103596,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERRE TALLA 4",
        "cantidad": 679,
        "valor": 60431,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-6",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERRE TALLA 4",
        "cantidad": 485,
        "valor": 43165,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 2328,
        "valor": 148992,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 2328,
        "valor": 153648,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-9",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMAGAR T4",
        "cantidad": 1164,
        "valor": 100104,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-10",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "ENMANGAR T14",
        "cantidad": 1164,
        "valor": 100104,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-11",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 2328,
        "valor": 100104,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2000-AS-12",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO CUELLO",
        "cantidad": 2328,
        "valor": 139680,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2061",
    "facturaNumero": 2061,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Beisball",
    "cantidad": 1620,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1458000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2061-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 1620,
        "valor": 139320
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-2",
        "nombre": "Sesgo Cuello",
        "precio": 60,
        "cantidad": 1620,
        "valor": 97200
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-3",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 810,
        "valor": 72090
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1620,
        "valor": 106920
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1620,
        "valor": 103680
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1620,
        "valor": 69660
      },
      {
        "id": "FAC-COOLKIDS-2061-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1620,
        "valor": 119880
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2061-AS-1",
        "operativeId": "OP-015",
        "operativeName": "Rosalin",
        "detalle": "HOMBROS",
        "cantidad": 1620,
        "valor": 93960,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR",
        "cantidad": 1620,
        "valor": 139320,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERRE T6",
        "cantidad": 810,
        "valor": 72090,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-4",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T4",
        "cantidad": 810,
        "valor": 72090,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-5",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1620,
        "valor": 69660,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO CUELLO",
        "cantidad": 1620,
        "valor": 97200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 1620,
        "valor": 103680,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 1620,
        "valor": 106920,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2061-AS-9",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 1620,
        "valor": 119880,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2074",
    "facturaNumero": 2074,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta De Colores",
    "cantidad": 1800,
    "valorUnitario": 900,
    "talla": "6TALLAS",
    "totalFactura": 1620000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2074-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1800,
        "valor": 115200
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1800,
        "valor": 122400
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1800,
        "valor": 99000
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1800,
        "valor": 108000
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1800,
        "valor": 77400
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-6",
        "nombre": "Pise Cacucho",
        "precio": 65,
        "cantidad": 1800,
        "valor": 117000
      },
      {
        "id": "FAC-COOLKIDS-2074-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 1800,
        "valor": 189000
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2074-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANT- TRASERO 14",
        "cantidad": 300,
        "valor": 24000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELAN-TRASERO T12,T10",
        "cantidad": 600,
        "valor": 48000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELAN- TRASERO T8",
        "cantidad": 300,
        "valor": 24000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO TODO",
        "cantidad": 1800,
        "valor": 122400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHO TODO",
        "cantidad": 1800,
        "valor": 108000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE DE CAUCHO",
        "cantidad": 1800,
        "valor": 117000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANT TRASERO T4,T6",
        "cantidad": 600,
        "valor": 48000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-8",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE DE CAUCHO",
        "cantidad": 1800,
        "valor": 77400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-9",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "REMATE DE TIRO T,4,6,8",
        "cantidad": 900,
        "valor": 38700,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-10",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE DE TIRO T,10,12,14",
        "cantidad": 900,
        "valor": 38700,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-11",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1800,
        "valor": 109000,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2074-AS-12",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA",
        "cantidad": 1800,
        "valor": 99000,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2078",
    "facturaNumero": 2078,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Conj Niño",
    "cantidad": 1265,
    "valorUnitario": 900,
    "talla": "TALLA 8",
    "totalFactura": 1138500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2078-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1265,
        "valor": 80960
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1265,
        "valor": 86020
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1265,
        "valor": 69575
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1265,
        "valor": 75900
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1265,
        "valor": 54395
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-6",
        "nombre": "Pise Cacucho",
        "precio": 65,
        "cantidad": 1265,
        "valor": 82225
      },
      {
        "id": "FAC-COOLKIDS-2078-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 1265,
        "valor": 132825
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2078-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANT-TRASERO",
        "cantidad": 1265,
        "valor": 101200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "REMATE TIRO",
        "cantidad": 1265,
        "valor": 80960,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 1265,
        "valor": 86020,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-4",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA",
        "cantidad": 1265,
        "valor": 69575,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADA",
        "cantidad": 1265,
        "valor": 75900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE  CAUCHO",
        "cantidad": 1265,
        "valor": 54395,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE CACUCHO",
        "cantidad": 1265,
        "valor": 82225,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2078-AS-8",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1265,
        "valor": 132825,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2076",
    "facturaNumero": 2076,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Conj Niño",
    "cantidad": 1265,
    "valorUnitario": 900,
    "talla": "TALLA4",
    "totalFactura": 1138500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2076-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1265,
        "valor": 80960
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1265,
        "valor": 86020
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1265,
        "valor": 69575
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1265,
        "valor": 75900
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 1265,
        "valor": 54395
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-6",
        "nombre": "Pise Cacucho",
        "precio": 65,
        "cantidad": 1265,
        "valor": 82225
      },
      {
        "id": "FAC-COOLKIDS-2076-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 1265,
        "valor": 132825
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2076-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANT-TRASERO",
        "cantidad": 1265,
        "valor": 101200,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE TIRO",
        "cantidad": 1265,
        "valor": 80960,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 1265,
        "valor": 86020,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-4",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA",
        "cantidad": 1265,
        "valor": 69575,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADA",
        "cantidad": 1265,
        "valor": 75900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE  CAUCHO",
        "cantidad": 1265,
        "valor": 54395,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE CACUCHO",
        "cantidad": 1265,
        "valor": 82225,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2076-AS-8",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1265,
        "valor": 132825,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2088",
    "facturaNumero": 2088,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa L Ar. Niño Pijama",
    "cantidad": 1644,
    "valorUnitario": 900,
    "talla": "6--10",
    "totalFactura": 1479600,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2088-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 1644,
        "valor": 141384
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-2",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1644,
        "valor": 105216
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1644,
        "valor": 108504
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-4",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1644,
        "valor": 98640
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-5",
        "nombre": "Hombros",
        "precio": 58,
        "cantidad": 1644,
        "valor": 95352
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1644,
        "valor": 70692
      },
      {
        "id": "FAC-COOLKIDS-2088-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1644,
        "valor": 121656
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2088-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGAS",
        "cantidad": 1644,
        "valor": 105216,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO BAJO",
        "cantidad": 1644,
        "valor": 108504,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-3",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS T6",
        "cantidad": 822,
        "valor": 47676,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGADO T6",
        "cantidad": 822,
        "valor": 70692,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGADO T10",
        "cantidad": 822,
        "valor": 70692,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBROS T10",
        "cantidad": 822,
        "valor": 47676,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE",
        "cantidad": 1644,
        "valor": 146316,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-8",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO",
        "cantidad": 1644,
        "valor": 98640,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-9",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1644,
        "valor": 70692,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2088-AS-10",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1644,
        "valor": 121656,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2097",
    "facturaNumero": 2097,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Conj Nba",
    "cantidad": 1223,
    "valorUnitario": 900,
    "talla": "12--14",
    "totalFactura": 1100700,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2097-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 1223,
        "valor": 78272
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 1223,
        "valor": 83164
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 1223,
        "valor": 67265
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1223,
        "valor": 73380
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-5",
        "nombre": "Remate Tiro Caucho",
        "precio": 43,
        "cantidad": 1223,
        "valor": 52589
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-6",
        "nombre": "Pise Caucho",
        "precio": 65,
        "cantidad": 1223,
        "valor": 79495
      },
      {
        "id": "FAC-COOLKIDS-2097-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 1223,
        "valor": 128415
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2097-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 1223,
        "valor": 83164,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANT-TRASERO",
        "cantidad": 559,
        "valor": 44720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLNA",
        "cantidad": 1223,
        "valor": 67265,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-4",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE DE CAUCHO",
        "cantidad": 1223,
        "valor": 79495,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANT-TRASERO",
        "cantidad": 664,
        "valor": 53120,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO",
        "cantidad": 1223,
        "valor": 73380,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE DE CAUCHO",
        "cantidad": 1223,
        "valor": 52589,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2097-AS-8",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1223,
        "valor": 128415,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2100",
    "facturaNumero": 2100,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Conjunto Nba",
    "cantidad": 946,
    "valorUnitario": 900,
    "talla": "4--6--8--10--12--1",
    "totalFactura": 851400,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2100-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": 946,
        "valor": 60544
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": 946,
        "valor": 64328
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": 946,
        "valor": 52030
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 946,
        "valor": 56760
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-5",
        "nombre": "Remate Tiro Caucho",
        "precio": 43,
        "cantidad": 946,
        "valor": 40678
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-6",
        "nombre": "Pise Caucho",
        "precio": 65,
        "cantidad": 946,
        "valor": 61490
      },
      {
        "id": "FAC-COOLKIDS-2100-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": 946,
        "valor": 99330
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2100-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANT-TRASERO",
        "cantidad": 946,
        "valor": 75680,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 946,
        "valor": 64328,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-3",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE PLANA",
        "cantidad": 946,
        "valor": 52030,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-4",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE DE CAUCHO",
        "cantidad": 946,
        "valor": 61490,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE DE TIRO",
        "cantidad": 946,
        "valor": 60544,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE DE CAUCHO",
        "cantidad": 946,
        "valor": 40678,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADA",
        "cantidad": 946,
        "valor": 56760,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2100-AS-8",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 946,
        "valor": 99330,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2954",
    "facturaNumero": 2954,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Conjunto Niño",
    "cantidad": 1265,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1138500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2954-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 1265,
        "valor": 108790
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-2",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1265,
        "valor": 80960
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1265,
        "valor": 83490
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-4",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1265,
        "valor": 75900
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-5",
        "nombre": "Hombros",
        "precio": 58,
        "cantidad": 1265,
        "valor": 73370
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1265,
        "valor": 54395
      },
      {
        "id": "FAC-COOLKIDS-2954-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1265,
        "valor": 93610
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2954-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLLO MANGA",
        "cantidad": 1265,
        "valor": 80960,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 1265,
        "valor": 83490,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE",
        "cantidad": 1265,
        "valor": 112585,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-4",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE CAMISA",
        "cantidad": 1265,
        "valor": 54395,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-5",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUZE",
        "cantidad": 1265,
        "valor": 93610,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO",
        "cantidad": 1265,
        "valor": 75900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGADO",
        "cantidad": 1265,
        "valor": 108790,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2954-AS-8",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS",
        "cantidad": 1265,
        "valor": 73370,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2962",
    "facturaNumero": 2962,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Pijama Niña Royito",
    "cantidad": 2492,
    "valorUnitario": 900,
    "talla": "4--8--12--",
    "totalFactura": 2242800,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2962-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 2492,
        "valor": 214312
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-2",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 2492,
        "valor": 159488
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 2492,
        "valor": 164472
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-4",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 2492,
        "valor": 149520
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-5",
        "nombre": "Hombros",
        "precio": 58,
        "cantidad": 806,
        "valor": 46748
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 2492,
        "valor": 107156
      },
      {
        "id": "FAC-COOLKIDS-2962-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 2492,
        "valor": 184408
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2962-AS-1",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 2492,
        "valor": 159488,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-2",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 2492,
        "valor": 164472,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "EMANGO T12",
        "cantidad": 806,
        "valor": 69316,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO T8",
        "cantidad": 843,
        "valor": 72498,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-5",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO T12",
        "cantidad": 806,
        "valor": 48360,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-6",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO T4",
        "cantidad": 843,
        "valor": 50580,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-7",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMOBRO T8",
        "cantidad": 843,
        "valor": 48894,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-8",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 2492,
        "valor": 107156,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-9",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS T4",
        "cantidad": 843,
        "valor": 48894,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-10",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T4",
        "cantidad": 843,
        "valor": 72498,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO T8",
        "cantidad": 843,
        "valor": 50580,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-12",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T12",
        "cantidad": 806,
        "valor": 71734,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-13",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T4",
        "cantidad": 843,
        "valor": 75027,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-14",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERRE T8",
        "cantidad": 843,
        "valor": 75027,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-15",
        "operativeId": "OP-012",
        "operativeName": "Andrea",
        "detalle": "DESPELUCE",
        "cantidad": 2492,
        "valor": 184408,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2962-AS-16",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO T12",
        "cantidad": 806,
        "valor": 46668,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2964",
    "facturaNumero": 2964,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Rollito",
    "cantidad": 1650,
    "valorUnitario": 900,
    "talla": "10--14",
    "totalFactura": 1485000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2964-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 841,
        "valor": 72326
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-2",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1650,
        "valor": 105600
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1650,
        "valor": 108900
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-4",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 809,
        "valor": 48540
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-5",
        "nombre": "Hombros",
        "precio": 58,
        "cantidad": 841,
        "valor": 48778
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1650,
        "valor": 70950
      },
      {
        "id": "FAC-COOLKIDS-2964-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1650,
        "valor": 122100
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2964-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGADO T14",
        "cantidad": 809,
        "valor": 69574,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERRE T10",
        "cantidad": 841,
        "valor": 74849,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO DE MANGA",
        "cantidad": 1650,
        "valor": 105600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 1650,
        "valor": 108900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-5",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1650,
        "valor": 70950,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T10",
        "cantidad": 841,
        "valor": 72326,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO T14",
        "cantidad": 809,
        "valor": 48540,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-8",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO T10",
        "cantidad": 841,
        "valor": 50460,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T14",
        "cantidad": 809,
        "valor": 72001,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-10",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBROS T14",
        "cantidad": 809,
        "valor": 46922,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-11",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 1650,
        "valor": 122100,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2964-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS T10",
        "cantidad": 841,
        "valor": 48778,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2974",
    "facturaNumero": 2974,
    "empresa": "COOLKIDS",
    "descripcion": "Chor Beisbolero",
    "cantidad": 1138,
    "valorUnitario": 1500,
    "talla": "12-8-6-4",
    "totalFactura": 1707000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2974-FN-1",
        "nombre": "Trasero",
        "precio": 60,
        "cantidad": 1138,
        "valor": 68280
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-2",
        "nombre": "Tiro",
        "precio": 60,
        "cantidad": 1138,
        "valor": 68280
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-3",
        "nombre": "Ciere Lado",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-4",
        "nombre": "Cajon",
        "precio": 150,
        "cantidad": 1138,
        "valor": 170700
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-5",
        "nombre": "Encauchado",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-6",
        "nombre": "Pise Caucho",
        "precio": 180,
        "cantidad": 1138,
        "valor": 204840
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-7",
        "nombre": "Remate Caucho",
        "precio": 43,
        "cantidad": 1138,
        "valor": 48934
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-8",
        "nombre": "Dobladillo",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2974-FN-9",
        "nombre": "Despeluse",
        "precio": 77,
        "cantidad": 1138,
        "valor": 87626
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2974-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTERO",
        "cantidad": 1138,
        "valor": 68280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TRASERO",
        "cantidad": 1138,
        "valor": 68280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-3",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "TIRO",
        "cantidad": 1138,
        "valor": 68280,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CAJON",
        "cantidad": 1138,
        "valor": 170700,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE CAUCHO",
        "cantidad": 1138,
        "valor": 204840,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-8",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATES",
        "cantidad": 1138,
        "valor": 48934,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-9",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "",
        "cantidad": null,
        "valor": 87626,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2974-AS-10",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERE",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2973",
    "facturaNumero": 2973,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Beisbolera",
    "cantidad": 1138,
    "valorUnitario": 1500,
    "talla": "12-8-6-4-",
    "totalFactura": 1707000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2973-FN-1",
        "nombre": "Enmangado",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-2",
        "nombre": "Ciere",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-3",
        "nombre": "Cuello",
        "precio": 200,
        "cantidad": 1138,
        "valor": 227600
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-4",
        "nombre": "Pise Cuello",
        "precio": 80,
        "cantidad": 1138,
        "valor": 91040
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 80,
        "cantidad": 1138,
        "valor": 91040
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-6",
        "nombre": "Dobladillo Abajo",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2973-FN-7",
        "nombre": "Despeluse",
        "precio": 180,
        "cantidad": 1138,
        "valor": 204840
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2973-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBRO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGA",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO  MANGA",
        "cantidad": 1138,
        "valor": 91040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "CUELLO",
        "cantidad": 1138,
        "valor": 227600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE CUELLO",
        "cantidad": 1138,
        "valor": 91040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO  ABAJO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2973-AS-8",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "",
        "cantidad": 1138,
        "valor": 204840,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2978",
    "facturaNumero": 2978,
    "empresa": "COOLKIDS",
    "descripcion": "Chor Beisbolero",
    "cantidad": 1115,
    "valorUnitario": 1500,
    "talla": "14-10-",
    "totalFactura": 1672500,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2978-FN-1",
        "nombre": "Trasero",
        "precio": 60,
        "cantidad": 1115,
        "valor": 66900
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-2",
        "nombre": "Tiro",
        "precio": 60,
        "cantidad": 1115,
        "valor": 66900
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-3",
        "nombre": "Ciere Lado",
        "precio": 90,
        "cantidad": 1115,
        "valor": 100350
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-4",
        "nombre": "Cajon",
        "precio": 150,
        "cantidad": 1115,
        "valor": 167250
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-5",
        "nombre": "Encauchado",
        "precio": 90,
        "cantidad": 1115,
        "valor": 100350
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-6",
        "nombre": "Pise Caucho",
        "precio": 180,
        "cantidad": 1115,
        "valor": 200700
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-7",
        "nombre": "Remate Caucho",
        "precio": 43,
        "cantidad": 1115,
        "valor": 47945
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-8",
        "nombre": "Dobladillo",
        "precio": 90,
        "cantidad": 1115,
        "valor": 100350
      },
      {
        "id": "FAC-COOLKIDS-2978-FN-9",
        "nombre": "Despeluse",
        "precio": 77,
        "cantidad": 1115,
        "valor": 85855
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2978-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTERO",
        "cantidad": 1115,
        "valor": 66900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TRASERO",
        "cantidad": 1115,
        "valor": 66900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-3",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "TIRO",
        "cantidad": 1115,
        "valor": 66900,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 1115,
        "valor": 100350,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CAJON",
        "cantidad": 1115,
        "valor": 167250,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO",
        "cantidad": 1115,
        "valor": 100350,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE CAUCHO",
        "cantidad": 1115,
        "valor": 200700,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-8",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATES",
        "cantidad": 1115,
        "valor": 47945,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-9",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "",
        "cantidad": 1115,
        "valor": 85855,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2978-AS-10",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERE",
        "cantidad": 1115,
        "valor": 100350,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2977",
    "facturaNumero": 2977,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Beisbolera",
    "cantidad": 1138,
    "valorUnitario": 1350,
    "talla": "14-10-",
    "totalFactura": 1536300,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2977-FN-1",
        "nombre": "Enmangado",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-2",
        "nombre": "Ciere",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-3",
        "nombre": "Cuello",
        "precio": 200,
        "cantidad": 1138,
        "valor": 227600
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-4",
        "nombre": "Pise Cuello",
        "precio": 80,
        "cantidad": 1138,
        "valor": 91040
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 80,
        "cantidad": 1138,
        "valor": 91040
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-6",
        "nombre": "Dobladillo Abajo",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      },
      {
        "id": "FAC-COOLKIDS-2977-FN-7",
        "nombre": "Despeluse",
        "precio": 90,
        "cantidad": 1138,
        "valor": 102420
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2977-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBRO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGA",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO  MANGA",
        "cantidad": 1138,
        "valor": 91040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "CUELLO",
        "cantidad": 1138,
        "valor": 227600,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE CUELLO",
        "cantidad": 1138,
        "valor": 91040,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO  ABAJO",
        "cantidad": 1138,
        "valor": 102420,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2977-AS-8",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "",
        "cantidad": 1138,
        "valor": 204840,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2995",
    "facturaNumero": 2995,
    "empresa": "COOLKIDS",
    "descripcion": "Camisa Rollito",
    "cantidad": 4347,
    "valorUnitario": 900,
    "talla": "TODAS",
    "totalFactura": 3912300,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2995-FN-1",
        "nombre": "Enmangado",
        "precio": 86,
        "cantidad": 4347,
        "valor": 373842
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-2",
        "nombre": "Ciere",
        "precio": 89,
        "cantidad": 4347,
        "valor": 386883
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-3",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 4347,
        "valor": 260820
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-4",
        "nombre": "Remate Cuello",
        "precio": 43,
        "cantidad": 4347,
        "valor": 186921
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 4347,
        "valor": 278208
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-6",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 4347,
        "valor": 286902
      },
      {
        "id": "FAC-COOLKIDS-2995-FN-7",
        "nombre": "Despeluse",
        "precio": 74,
        "cantidad": 4347,
        "valor": 321678
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2995-AS-1",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "HOMBROS",
        "cantidad": 4347,
        "valor": 252126,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGAS",
        "cantidad": 4347,
        "valor": 373842,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE",
        "cantidad": 4347,
        "valor": 386883,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO  MANGA",
        "cantidad": 4347,
        "valor": 278208,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO",
        "cantidad": 4347,
        "valor": 286902,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO",
        "cantidad": 4347,
        "valor": 260820,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-7",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 4347,
        "valor": 186921,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2995-AS-8",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 4347,
        "valor": 321678,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2159",
    "facturaNumero": 2159,
    "empresa": "COOLKIDS",
    "descripcion": "Camisilla",
    "cantidad": 1140,
    "valorUnitario": 900,
    "talla": "1-2-3-",
    "totalFactura": 1026000,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2159-FN-1",
        "nombre": "Cierre Lados",
        "precio": 65,
        "cantidad": 1140,
        "valor": 74100
      },
      {
        "id": "FAC-COOLKIDS-2159-FN-2",
        "nombre": "Sesgo De Cuello",
        "precio": 60,
        "cantidad": 1140,
        "valor": 68400
      },
      {
        "id": "FAC-COOLKIDS-2159-FN-3",
        "nombre": "Sesgo Manga",
        "precio": 68,
        "cantidad": 1140,
        "valor": 77520
      },
      {
        "id": "FAC-COOLKIDS-2159-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1140,
        "valor": 75240
      },
      {
        "id": "FAC-COOLKIDS-2159-FN-5",
        "nombre": "Remates",
        "precio": 100,
        "cantidad": 1140,
        "valor": 114000
      },
      {
        "id": "FAC-COOLKIDS-2159-FN-6",
        "nombre": "Despeluze",
        "precio": 123,
        "cantidad": 1140,
        "valor": 140220
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2159-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBRO",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2159-AS-2",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERE",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-COOLKIDS-2160",
    "facturaNumero": 2160,
    "empresa": "COOLKIDS",
    "descripcion": "Pantaloneta Nba",
    "cantidad": 1141,
    "valorUnitario": 900,
    "talla": "1-2-3-",
    "totalFactura": 1026900,
    "funciones": [
      {
        "id": "FAC-COOLKIDS-2160-FN-1",
        "nombre": "Remate Tiro",
        "precio": 64,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-2",
        "nombre": "Dobladillo",
        "precio": 68,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-3",
        "nombre": "Pise Plana",
        "precio": 55,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-4",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1141,
        "valor": 68460
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-5",
        "nombre": "Remate Tiro Caucho",
        "precio": 43,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-6",
        "nombre": "Pise Caucho",
        "precio": 65,
        "cantidad": null,
        "valor": 0
      },
      {
        "id": "FAC-COOLKIDS-2160-FN-7",
        "nombre": "Despeluze",
        "precio": 105,
        "cantidad": null,
        "valor": 0
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-COOLKIDS-2160-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELANTRASER T-2-3 FAC-2160",
        "cantidad": 759,
        "valor": 60720,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2160-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTRASER T-1 FAC-2160",
        "cantidad": 380,
        "valor": 30400,
        "prestamos": null
      },
      {
        "id": "FAC-COOLKIDS-2160-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO  1-2-3-",
        "cantidad": 1141,
        "valor": 68460,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-6",
    "facturaNumero": 6,
    "empresa": "IMPERIUM",
    "descripcion": "Camisa Pillama",
    "cantidad": 1344,
    "valorUnitario": 900,
    "talla": "10-6-",
    "totalFactura": 1209600,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-6-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 672,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-6-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 672,
        "valor": 59808
      },
      {
        "id": "FAC-IMPERIUM-6-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1344,
        "valor": 86016
      },
      {
        "id": "FAC-IMPERIUM-6-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1344,
        "valor": 88704
      },
      {
        "id": "FAC-IMPERIUM-6-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1344,
        "valor": 80640
      },
      {
        "id": "FAC-IMPERIUM-6-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1344,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-6-FN-7",
        "nombre": "Despeluze",
        "precio": 59,
        "cantidad": 1344,
        "valor": 79296
      },
      {
        "id": "FAC-IMPERIUM-6-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 15,
        "cantidad": 1344,
        "valor": 20160
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-6-AS-1",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "HOMBROS 006-OLGA-T10-6",
        "cantidad": 1344,
        "valor": 77952,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-2",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-FAC 06-OLGA",
        "cantidad": 1344,
        "valor": 79296,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-3",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "SESGO MUESTRAS-64-OLGA",
        "cantidad": 64,
        "valor": 3840,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-OLGA-FAC-006-M",
        "cantidad": 1344,
        "valor": 86016,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-5",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR SEGO-06-OLGA",
        "cantidad": 1344,
        "valor": 20160,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-6",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-6-OLGA-FAC06",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T-10-OLGA-FA",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-8",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "CIERE-T6-OLGA-FAC-06",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-9",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERE-T10-OLGA-FAC-06-2-P",
        "cantidad": 168,
        "valor": 14952,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-10",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SEGO-OLGA-FAC-06-T-10-6",
        "cantidad": 1344,
        "valor": 76800,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-11",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T-10-FAC-06-OLGA",
        "cantidad": 504,
        "valor": 44856,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-T10-6-OLGA",
        "cantidad": 1344,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-6-AS-13",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-OLGA-FAC-006-ABAJ",
        "cantidad": 1344,
        "valor": 88704,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-7",
    "facturaNumero": 7,
    "empresa": "IMPERIUM",
    "descripcion": "Pantalon-pillama",
    "cantidad": 1344,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1209600,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-7-FN-1",
        "nombre": "Ciere-Tiro",
        "precio": 95,
        "cantidad": 672,
        "valor": 63840
      },
      {
        "id": "FAC-IMPERIUM-7-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 68,
        "cantidad": 672,
        "valor": 45696
      },
      {
        "id": "FAC-IMPERIUM-7-FN-3",
        "nombre": "Encauchada",
        "precio": 60,
        "cantidad": 1344,
        "valor": 80640
      },
      {
        "id": "FAC-IMPERIUM-7-FN-4",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 1344,
        "valor": 87360
      },
      {
        "id": "FAC-IMPERIUM-7-FN-5",
        "nombre": "Remate-Caucho",
        "precio": 43,
        "cantidad": 1344,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-7-FN-6",
        "nombre": "Despeluze",
        "precio": 129,
        "cantidad": 1344,
        "valor": 173376
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-7-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELAN-TRASERO-FAC-07-OL",
        "cantidad": 672,
        "valor": 53760,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "DELAN-TRASERO-FAC-07-OL",
        "cantidad": 672,
        "valor": 53760,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-3",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OLGA",
        "cantidad": 1344,
        "valor": 173376,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE CAUCHO-OLGA-FAC",
        "cantidad": 1344,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-5",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO-FAC-07-OLGA",
        "cantidad": 1344,
        "valor": 80640,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DIBLA-BOTA-OLGA-FAC-07T14",
        "cantidad": 672,
        "valor": 45696,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "DIBLA-BOTA-OLGA-FAC-07T4",
        "cantidad": 672,
        "valor": 45696,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-8",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-OLGA-FAC-07",
        "cantidad": 1344,
        "valor": 87360,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-TIRO-OLGA-FAC-07-T-4",
        "cantidad": 672,
        "valor": 63840,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-7-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-TIRO-OLGA-FAC-07-T-4",
        "cantidad": 672,
        "valor": 63840,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-8",
    "facturaNumero": 8,
    "empresa": "IMPERIUM",
    "descripcion": "Camisa-niño",
    "cantidad": 1344,
    "valorUnitario": 1000,
    "talla": "12--6",
    "totalFactura": 1344000,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-8-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 672,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-8-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 168,
        "valor": 14952
      },
      {
        "id": "FAC-IMPERIUM-8-FN-3",
        "nombre": "Sesgo Manga",
        "precio": 60,
        "cantidad": 1344,
        "valor": 80640
      },
      {
        "id": "FAC-IMPERIUM-8-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1344,
        "valor": 88704
      },
      {
        "id": "FAC-IMPERIUM-8-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1344,
        "valor": 80640
      },
      {
        "id": "FAC-IMPERIUM-8-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1344,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-8-FN-7",
        "nombre": "Despeluze",
        "precio": 68,
        "cantidad": 1344,
        "valor": 91392
      },
      {
        "id": "FAC-IMPERIUM-8-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 70,
        "cantidad": 1344,
        "valor": 94080
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-8-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "UNIR-SESGO-OLGA",
        "cantidad": 1344,
        "valor": 94080,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBROS-OLGA-T-12-6",
        "cantidad": 1344,
        "valor": 77952,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T-12-OLGA",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-4",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-OLGA-MANGA-",
        "cantidad": 1344,
        "valor": 80640,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-OLGA-CUELLO-",
        "cantidad": 1344,
        "valor": 80640,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-6",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-OLGA",
        "cantidad": 1344,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-7",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE -OLGA T6",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO -OLGA",
        "cantidad": 1344,
        "valor": 88704,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-9",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERRE - OLGA 6 PAQUETES T12",
        "cantidad": 504,
        "valor": 44856,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-10",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "CIERRE - OLGA 2 PAQUETES T12",
        "cantidad": 168,
        "valor": 14952,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-11",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMNAGAR TALLA 6- OLGA",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-8-AS-12",
        "operativeId": "OP-016",
        "operativeName": "Alexis",
        "detalle": "DESPELUZE",
        "cantidad": 1344,
        "valor": 91392,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-9",
    "facturaNumero": 9,
    "empresa": "IMPERIUM",
    "descripcion": "Short-baño",
    "cantidad": 672,
    "valorUnitario": 900,
    "talla": "6--4",
    "totalFactura": 604800,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-9-FN-1",
        "nombre": "Trasero",
        "precio": 43,
        "cantidad": 672,
        "valor": 28896
      },
      {
        "id": "FAC-IMPERIUM-9-FN-2",
        "nombre": "Tiro",
        "precio": 52.7,
        "cantidad": 672,
        "valor": 35414.4
      },
      {
        "id": "FAC-IMPERIUM-9-FN-3",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 672,
        "valor": 40320
      },
      {
        "id": "FAC-IMPERIUM-9-FN-4",
        "nombre": "Dobladillo",
        "precio": 70,
        "cantidad": 672,
        "valor": 47040
      },
      {
        "id": "FAC-IMPERIUM-9-FN-5",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 672,
        "valor": 43680
      },
      {
        "id": "FAC-IMPERIUM-9-FN-6",
        "nombre": "Ciere-Lado",
        "precio": 55,
        "cantidad": 672,
        "valor": 36960
      },
      {
        "id": "FAC-IMPERIUM-9-FN-7",
        "nombre": "Despeluze",
        "precio": 108.3,
        "cantidad": 672,
        "valor": 72777.59999999999
      },
      {
        "id": "FAC-IMPERIUM-9-FN-8",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 672,
        "valor": 28896
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-9-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "TRASERO-CHOR-VAÑO-OLGA",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTERO-CHOR-VAÑO-OL",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-3",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TRASERO-CHOR-VAÑO-OLGA",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANTERO-CHOR-VAÑO-OL",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-CHORS-OLGA",
        "cantidad": 672,
        "valor": 47040,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO-OLGA-VAÑO",
        "cantidad": 672,
        "valor": 40320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO",
        "cantidad": 672,
        "valor": 43680,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-8",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-OLGA",
        "cantidad": 672,
        "valor": 72778,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-9",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 28896,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-LADO-OLGA",
        "cantidad": 336,
        "valor": 18480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-11",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 17707,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-12",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERE-LADO-OLGA",
        "cantidad": 336,
        "valor": 18480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-9-AS-13",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 17707,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-10",
    "facturaNumero": 10,
    "empresa": "IMPERIUM",
    "descripcion": "Short Baño",
    "cantidad": 672,
    "valorUnitario": 900,
    "talla": "8--10",
    "totalFactura": 604800,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-10-FN-1",
        "nombre": "Trasero",
        "precio": 43,
        "cantidad": 336,
        "valor": 14448
      },
      {
        "id": "FAC-IMPERIUM-10-FN-2",
        "nombre": "Tiro",
        "precio": 52.7,
        "cantidad": 336,
        "valor": 17707.2
      },
      {
        "id": "FAC-IMPERIUM-10-FN-3",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 672,
        "valor": 40320
      },
      {
        "id": "FAC-IMPERIUM-10-FN-4",
        "nombre": "Dobladillo",
        "precio": 70,
        "cantidad": 672,
        "valor": 47040
      },
      {
        "id": "FAC-IMPERIUM-10-FN-5",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 672,
        "valor": 43680
      },
      {
        "id": "FAC-IMPERIUM-10-FN-6",
        "nombre": "Ciere-Lado",
        "precio": 55,
        "cantidad": 336,
        "valor": 18480
      },
      {
        "id": "FAC-IMPERIUM-10-FN-7",
        "nombre": "Despeluze",
        "precio": 108.3,
        "cantidad": 672,
        "valor": 72777.59999999999
      },
      {
        "id": "FAC-IMPERIUM-10-FN-8",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 672,
        "valor": 28896
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-10-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TRASERO-T8-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTERO-T8-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T8-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 18480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-4",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "TIRO-T8-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 17707,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO OLGA ABAJO T8-10",
        "cantidad": 672,
        "valor": 47040,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO-OLGA-BAÑO-8-10",
        "cantidad": 672,
        "valor": 40320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-7",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "DELANTERO-T10-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TRASERO-T10-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 14448,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-9",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T10-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 18480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-10",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "TIRO-T-10-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 17707,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 43680,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE-CAUCHO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 28896,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-10-AS-13",
        "operativeId": "OP-009",
        "operativeName": "Alexander",
        "detalle": "DESPELUZE-BAÑO-OLGA",
        "cantidad": 672,
        "valor": 72778,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-11",
    "facturaNumero": 11,
    "empresa": "IMPERIUM",
    "descripcion": "Buso-baño",
    "cantidad": 672,
    "valorUnitario": 1100,
    "talla": "14--12",
    "totalFactura": 739200,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-11-FN-1",
        "nombre": "Cierre De Mangas",
        "precio": 80,
        "cantidad": 336,
        "valor": 26880
      },
      {
        "id": "FAC-IMPERIUM-11-FN-2",
        "nombre": "Cierre De Lados",
        "precio": 65,
        "cantidad": 336,
        "valor": 21840
      },
      {
        "id": "FAC-IMPERIUM-11-FN-3",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 672,
        "valor": 44352
      },
      {
        "id": "FAC-IMPERIUM-11-FN-4",
        "nombre": "Dobladillo Mangas",
        "precio": 64,
        "cantidad": 672,
        "valor": 43008
      },
      {
        "id": "FAC-IMPERIUM-11-FN-5",
        "nombre": "Montar Cuellos",
        "precio": 200,
        "cantidad": 672,
        "valor": 134400
      },
      {
        "id": "FAC-IMPERIUM-11-FN-6",
        "nombre": "Pise De Plana Cuellos",
        "precio": 65,
        "cantidad": 336,
        "valor": 21840
      },
      {
        "id": "FAC-IMPERIUM-11-FN-7",
        "nombre": "Despeluce",
        "precio": 179,
        "cantidad": 672,
        "valor": 120288
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-11-AS-1",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "BUSO-BAÑO-OLGA-",
        "cantidad": 336,
        "valor": 99120,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "BUSO-BAÑO-OLGA-",
        "cantidad": 336,
        "valor": 99120,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-3",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-OLGA-BAÑO-ABAJO",
        "cantidad": 672,
        "valor": 44352,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLDILLO-OLGA-MANGA",
        "cantidad": 672,
        "valor": 43008,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-5",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "CUELLO-BAÑO-OLGA-T-14-12",
        "cantidad": 672,
        "valor": 134400,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "PISE-CUELLO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 43680,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-11-AS-7",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE--OLGA",
        "cantidad": 672,
        "valor": 120288,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-12",
    "facturaNumero": 12,
    "empresa": "IMPERIUM",
    "descripcion": "Short Trage-baño",
    "cantidad": 672,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 604800,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-12-FN-1",
        "nombre": "Trasero",
        "precio": 43,
        "cantidad": 672,
        "valor": 28896
      },
      {
        "id": "FAC-IMPERIUM-12-FN-2",
        "nombre": "Tiro",
        "precio": 52.7,
        "cantidad": 672,
        "valor": 35414.4
      },
      {
        "id": "FAC-IMPERIUM-12-FN-3",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 672,
        "valor": 40320
      },
      {
        "id": "FAC-IMPERIUM-12-FN-4",
        "nombre": "Dobladillo",
        "precio": 70,
        "cantidad": 672,
        "valor": 47040
      },
      {
        "id": "FAC-IMPERIUM-12-FN-5",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 672,
        "valor": 43680
      },
      {
        "id": "FAC-IMPERIUM-12-FN-6",
        "nombre": "Ciere-Lado",
        "precio": 55,
        "cantidad": 672,
        "valor": 36960
      },
      {
        "id": "FAC-IMPERIUM-12-FN-7",
        "nombre": "Despeluze",
        "precio": 108.3,
        "cantidad": 672,
        "valor": 72777.59999999999
      },
      {
        "id": "FAC-IMPERIUM-12-FN-8",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 672,
        "valor": 28896
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-12-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CHOR OLGA-BAÑO",
        "cantidad": 336,
        "valor": 65083,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CHOR-OLGA-BAÑO",
        "cantidad": 336,
        "valor": 65083,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CAUCHO OLGA BAÑO",
        "cantidad": 672,
        "valor": 40320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 47040,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "REMATE-CAUCHO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 28896,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-6",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 672,
        "valor": 72778,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISE-CAUCHO-OLGA-BAÑO",
        "cantidad": 672,
        "valor": 43680,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-12",
    "facturaNumero": 12,
    "empresa": "IMPERIUM",
    "descripcion": "Camisa",
    "cantidad": 1344,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 1209600,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-12-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 672,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-12-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 672,
        "valor": 59808
      },
      {
        "id": "FAC-IMPERIUM-12-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1344,
        "valor": 86016
      },
      {
        "id": "FAC-IMPERIUM-12-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 1344,
        "valor": 88704
      },
      {
        "id": "FAC-IMPERIUM-12-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1344,
        "valor": 80640
      },
      {
        "id": "FAC-IMPERIUM-12-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1344,
        "valor": 57792
      },
      {
        "id": "FAC-IMPERIUM-12-FN-7",
        "nombre": "Despeluze",
        "precio": 59,
        "cantidad": 1344,
        "valor": 79296
      },
      {
        "id": "FAC-IMPERIUM-12-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 15,
        "cantidad": 1344,
        "valor": 20160
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-12-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBRO-OLGA-FAC-12-T-14",
        "cantidad": 672,
        "valor": 38976,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "MANGA-OLGA-FAC-12-T14",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-3",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-OLGA-FAC-12-T14",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-OLGA-FAC-12-T-4-",
        "cantidad": 672,
        "valor": 38976,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "MANGA-OLGA-FAC-12-T4",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-MANGA-OLGA-T14-FAC-12",
        "cantidad": 1344,
        "valor": 86016,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-ABAJO-OLGA-T14-FAC-12",
        "cantidad": 1344,
        "valor": 88704,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-8",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-OLGA-FAC-12-T4",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-9",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUZE",
        "cantidad": 1344,
        "valor": 79296,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-10",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "UNIR-SESGO-OLGA-",
        "cantidad": 1344,
        "valor": 20160,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-11",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO-OLGA-FAC12-T14-4",
        "cantidad": 1344,
        "valor": 80640,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-12-AS-12",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE-OLGA",
        "cantidad": 1344,
        "valor": 57792,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-13",
    "facturaNumero": 13,
    "empresa": "IMPERIUM",
    "descripcion": "Buso-bb",
    "cantidad": 3120,
    "valorUnitario": 900,
    "talla": "1-2-3-",
    "totalFactura": 2808000,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-13-FN-1",
        "nombre": "Manga",
        "precio": 86,
        "cantidad": 1040,
        "valor": 89440
      },
      {
        "id": "FAC-IMPERIUM-13-FN-2",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1040,
        "valor": 92560
      },
      {
        "id": "FAC-IMPERIUM-13-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 3120,
        "valor": 199680
      },
      {
        "id": "FAC-IMPERIUM-13-FN-4",
        "nombre": "Dobladillo",
        "precio": 66,
        "cantidad": 3120,
        "valor": 205920
      },
      {
        "id": "FAC-IMPERIUM-13-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1040,
        "valor": 62400
      },
      {
        "id": "FAC-IMPERIUM-13-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 3120,
        "valor": 134160
      },
      {
        "id": "FAC-IMPERIUM-13-FN-7",
        "nombre": "Despeluze",
        "precio": 49,
        "cantidad": 3120,
        "valor": 152880
      },
      {
        "id": "FAC-IMPERIUM-13-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 25,
        "cantidad": 3120,
        "valor": 78000
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-13-AS-1",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR-SESGO-OLGA",
        "cantidad": 3120,
        "valor": 78000,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-2",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "HOMBRO-T-1-BB-OLGA",
        "cantidad": 1040,
        "valor": 60320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-3",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBRO-T-2-BB-OLGA",
        "cantidad": 1040,
        "valor": 60320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-4",
        "operativeId": "OP-015",
        "operativeName": "Rosalin",
        "detalle": "HOMBROS-T-3-BB-OLGA",
        "cantidad": 1040,
        "valor": 60320,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-5",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERE-T-1-OLGA-FAC-13-BB",
        "cantidad": 1040,
        "valor": 92560,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-6",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERE-T-2-OLGA-FAC-13-BB",
        "cantidad": 1040,
        "valor": 92500,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-7",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERE-T-3-OLGA-FAC-13-BB",
        "cantidad": 910,
        "valor": 80990,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-8",
        "operativeId": "OP-015",
        "operativeName": "Rosalin",
        "detalle": "CIERE-T-2-OLGA-FAC-13-BB",
        "cantidad": 130,
        "valor": 11570,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-9",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-OLGA-BB-MANGA",
        "cantidad": 3120,
        "valor": 199680,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-10",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLA-OLGA-BB-ABAJO",
        "cantidad": 3120,
        "valor": 205920,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-11",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-3-OLGA",
        "cantidad": 1040,
        "valor": 89440,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-12",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO-T-2-OLGA",
        "cantidad": 1040,
        "valor": 89440,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-13",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGO-T-1-OLGA",
        "cantidad": 1040,
        "valor": 89440,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-14",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE-OLGA",
        "cantidad": 3120,
        "valor": 134160,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-13-AS-15",
        "operativeId": "OP-008",
        "operativeName": "Despelusado (Externo)",
        "detalle": "DESPELUSE",
        "cantidad": 3120,
        "valor": 152880,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-SN1",
    "facturaNumero": "S/N",
    "empresa": "IMPERIUM",
    "descripcion": "Pant Colombia",
    "cantidad": 256,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 230400,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-SN1-FN-1",
        "nombre": "Ciere  Tiro",
        "precio": 64,
        "cantidad": 256,
        "valor": 16384
      },
      {
        "id": "FAC-IMPERIUM-SN1-FN-2",
        "nombre": "Dobladillo-Bota",
        "precio": 80,
        "cantidad": 256,
        "valor": 20480
      },
      {
        "id": "FAC-IMPERIUM-SN1-FN-3",
        "nombre": "Pise-Caucho",
        "precio": 65,
        "cantidad": 256,
        "valor": 16640
      },
      {
        "id": "FAC-IMPERIUM-SN1-FN-4",
        "nombre": "Encauchado",
        "precio": 60,
        "cantidad": 256,
        "valor": 15360
      },
      {
        "id": "FAC-IMPERIUM-SN1-FN-5",
        "nombre": "Remate  Caucho",
        "precio": 43,
        "cantidad": 256,
        "valor": 11008
      },
      {
        "id": "FAC-IMPERIUM-SN1-FN-6",
        "nombre": "Despeluze",
        "precio": 148,
        "cantidad": 256,
        "valor": 37888
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-SN1-AS-1",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "DELANT-TRASERO",
        "cantidad": 256,
        "valor": 20480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-2",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "TIRO",
        "cantidad": 256,
        "valor": 16384,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-3",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "ENCAUCHADO",
        "cantidad": 256,
        "valor": 20480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-4",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "REMATE TIRO",
        "cantidad": 256,
        "valor": 16640,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO BOTA",
        "cantidad": 256,
        "valor": 15360,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "PISO CACUCHO",
        "cantidad": 256,
        "valor": 11008,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN1-AS-7",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 256,
        "valor": 37888,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-27",
    "facturaNumero": 27,
    "empresa": "IMPERIUM",
    "descripcion": "Camisa Colombia",
    "cantidad": 1024,
    "valorUnitario": 900,
    "talla": null,
    "totalFactura": 921600,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-27-FN-1",
        "nombre": "Enmngar",
        "precio": 86,
        "cantidad": 1024,
        "valor": 88064
      },
      {
        "id": "FAC-IMPERIUM-27-FN-2",
        "nombre": "Sesgo Cuello",
        "precio": 60,
        "cantidad": 1024,
        "valor": 61440
      },
      {
        "id": "FAC-IMPERIUM-27-FN-3",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 1024,
        "valor": 91136
      },
      {
        "id": "FAC-IMPERIUM-27-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1024,
        "valor": 67584
      },
      {
        "id": "FAC-IMPERIUM-27-FN-5",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1024,
        "valor": 65536
      },
      {
        "id": "FAC-IMPERIUM-27-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1024,
        "valor": 44032
      },
      {
        "id": "FAC-IMPERIUM-27-FN-7",
        "nombre": "Despeluze",
        "precio": 74,
        "cantidad": 1024,
        "valor": 75776
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-27-AS-1",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T6,T4,,T8",
        "cantidad": 768,
        "valor": 68352,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-2",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBTOS T4,T6",
        "cantidad": 512,
        "valor": 29696,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-3",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "HOMBROS T8,T12",
        "cantidad": 512,
        "valor": 29696,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-4",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 1024,
        "valor": 65536,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-5",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 1024,
        "valor": 67584,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-6",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO",
        "cantidad": 1024,
        "valor": 61440,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-7",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "CIERRE T12",
        "cantidad": 256,
        "valor": 22784,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-8",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGADO T4,T6",
        "cantidad": 512,
        "valor": 44032,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-9",
        "operativeId": "OP-013",
        "operativeName": "Alejandra",
        "detalle": "ENMANGADO T8",
        "cantidad": 256,
        "valor": 22016,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-10",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "ENMANGADO T12",
        "cantidad": 256,
        "valor": 22016,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-11",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 1024,
        "valor": 75776,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1024,
        "valor": 44032,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-27",
    "facturaNumero": 27,
    "empresa": "IMPERIUM",
    "descripcion": "Camisa Niña Caro",
    "cantidad": 2016,
    "valorUnitario": 1000,
    "talla": null,
    "totalFactura": 2016000,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-27-FN-1",
        "nombre": "Enmngar",
        "precio": 86,
        "cantidad": 2016,
        "valor": 173376
      },
      {
        "id": "FAC-IMPERIUM-27-FN-2",
        "nombre": "Sesgo Cuello",
        "precio": 60,
        "cantidad": 2016,
        "valor": 120960
      },
      {
        "id": "FAC-IMPERIUM-27-FN-3",
        "nombre": "Cierre",
        "precio": 89,
        "cantidad": 2016,
        "valor": 179424
      },
      {
        "id": "FAC-IMPERIUM-27-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 2016,
        "valor": 133056
      },
      {
        "id": "FAC-IMPERIUM-27-FN-5",
        "nombre": "Sesgo De Manga",
        "precio": 64,
        "cantidad": 2016,
        "valor": 129024
      },
      {
        "id": "FAC-IMPERIUM-27-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 2016,
        "valor": 86688
      },
      {
        "id": "FAC-IMPERIUM-27-FN-7",
        "nombre": "Despeluze",
        "precio": 84,
        "cantidad": 2016,
        "valor": 169344
      },
      {
        "id": "FAC-IMPERIUM-27-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 50,
        "cantidad": 2016,
        "valor": 100800
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-27-AS-1",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS T6,T8",
        "cantidad": 1344,
        "valor": 77952,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-2",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERRE T8",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-3",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 2016,
        "valor": 86688,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS T4",
        "cantidad": 672,
        "valor": 38976,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T4,T6",
        "cantidad": 1344,
        "valor": 115584,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-6",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "ENMAGAR T8",
        "cantidad": 672,
        "valor": 57792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-7",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO DE ABAJO",
        "cantidad": 2016,
        "valor": 133056,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-8",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO DE MANGA",
        "cantidad": 2016,
        "valor": 129024,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-9",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO CUELLO",
        "cantidad": 2016,
        "valor": 120960,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-10",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "CIERRE T4",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-11",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T6",
        "cantidad": 672,
        "valor": 59808,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-12",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 2016,
        "valor": 169344,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-27-AS-13",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR SESGO",
        "cantidad": 2016,
        "valor": 100800,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-28",
    "facturaNumero": 28,
    "empresa": "IMPERIUM",
    "descripcion": "Vestido Niña",
    "cantidad": 2016,
    "valorUnitario": 1100,
    "talla": null,
    "totalFactura": 2217600,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-28-FN-1",
        "nombre": "Enmngar",
        "precio": 86,
        "cantidad": 2016,
        "valor": 173376
      },
      {
        "id": "FAC-IMPERIUM-28-FN-2",
        "nombre": "Sesgo Cuello",
        "precio": 60,
        "cantidad": 2016,
        "valor": 120960
      },
      {
        "id": "FAC-IMPERIUM-28-FN-3",
        "nombre": "Cierre",
        "precio": 130,
        "cantidad": 2016,
        "valor": 262080
      },
      {
        "id": "FAC-IMPERIUM-28-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 90,
        "cantidad": 2016,
        "valor": 181440
      },
      {
        "id": "FAC-IMPERIUM-28-FN-5",
        "nombre": "Dobladillo De Manga",
        "precio": 64,
        "cantidad": 2016,
        "valor": 129024
      },
      {
        "id": "FAC-IMPERIUM-28-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 2016,
        "valor": 86688
      },
      {
        "id": "FAC-IMPERIUM-28-FN-7",
        "nombre": "Despeluze",
        "precio": 104,
        "cantidad": 2016,
        "valor": 209664
      },
      {
        "id": "FAC-IMPERIUM-28-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 25,
        "cantidad": 2016,
        "valor": 50400
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-28-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS T12,T16",
        "cantidad": 1008,
        "valor": 58464,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGAR T4,16",
        "cantidad": 1008,
        "valor": 86688,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-3",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "HOMBROS T4",
        "cantidad": 504,
        "valor": 29232,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-4",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 2016,
        "valor": 86688,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T8,T12",
        "cantidad": 1008,
        "valor": 86688,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-6",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR SESGO",
        "cantidad": 2016,
        "valor": 50400,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-7",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO CUELLO",
        "cantidad": 2016,
        "valor": 120960,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-8",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA VESTIDO",
        "cantidad": 2016,
        "valor": 129024,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-9",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO ABAJO",
        "cantidad": 2016,
        "valor": 181440,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-10",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 2016,
        "valor": 209664,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-11",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "HOMBROS T8",
        "cantidad": 504,
        "valor": 29232,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-12",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERRE T8,",
        "cantidad": 1008,
        "valor": 131040,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-13",
        "operativeId": "OP-002",
        "operativeName": "Argenis",
        "detalle": "CIERRE T12,",
        "cantidad": 1008,
        "valor": 131040,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-28",
    "facturaNumero": 28,
    "empresa": "IMPERIUM",
    "descripcion": "Short Bengalina",
    "cantidad": 828,
    "valorUnitario": 1500,
    "talla": null,
    "totalFactura": 1242000,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-28-FN-1",
        "nombre": "Tiro Trasero",
        "precio": 50,
        "cantidad": 276,
        "valor": 13800
      },
      {
        "id": "FAC-IMPERIUM-28-FN-2",
        "nombre": "Armar Bolsillo",
        "precio": 50,
        "cantidad": 276,
        "valor": 13800
      },
      {
        "id": "FAC-IMPERIUM-28-FN-3",
        "nombre": "Pegar Bolsillo",
        "precio": 80,
        "cantidad": 276,
        "valor": 22080
      },
      {
        "id": "FAC-IMPERIUM-28-FN-4",
        "nombre": "Cierre De Lado",
        "precio": 130,
        "cantidad": 276,
        "valor": 35880
      },
      {
        "id": "FAC-IMPERIUM-28-FN-5",
        "nombre": "Dobladillo",
        "precio": 73,
        "cantidad": 276,
        "valor": 20148
      },
      {
        "id": "FAC-IMPERIUM-28-FN-6",
        "nombre": "Remate De Tiro",
        "precio": 64,
        "cantidad": 276,
        "valor": 17664
      },
      {
        "id": "FAC-IMPERIUM-28-FN-7",
        "nombre": "Sesgo Tira",
        "precio": 50,
        "cantidad": 276,
        "valor": 13800
      },
      {
        "id": "FAC-IMPERIUM-28-FN-8",
        "nombre": "Pisar Bolsillo",
        "precio": 80,
        "cantidad": 276,
        "valor": 22080
      },
      {
        "id": "FAC-IMPERIUM-28-FN-9",
        "nombre": "Encauchado",
        "precio": 70,
        "cantidad": 276,
        "valor": 19320
      },
      {
        "id": "FAC-IMPERIUM-28-FN-10",
        "nombre": "Pise De Caucho",
        "precio": 100,
        "cantidad": 276,
        "valor": 27600
      },
      {
        "id": "FAC-IMPERIUM-28-FN-11",
        "nombre": "Remate De Caucho",
        "precio": 43,
        "cantidad": 276,
        "valor": 11868
      },
      {
        "id": "FAC-IMPERIUM-28-FN-12",
        "nombre": "Pegar Tira",
        "precio": 25,
        "cantidad": 276,
        "valor": 6900
      },
      {
        "id": "FAC-IMPERIUM-28-FN-13",
        "nombre": "Despeluze",
        "precio": 36,
        "cantidad": 276,
        "valor": 9936
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-28-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ARMAR BOLSILLO",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-28-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "PEGAR BOLSILLO",
        "cantidad": null,
        "valor": null,
        "prestamos": null
      }
    ]
  },
  {
    "id": "FAC-IMPERIUM-SN2",
    "facturaNumero": "S/N",
    "empresa": "IMPERIUM",
    "descripcion": "Camisa Cjn Niña",
    "cantidad": 1512,
    "valorUnitario": 900,
    "talla": "4--12--14",
    "totalFactura": 1360800,
    "funciones": [
      {
        "id": "FAC-IMPERIUM-SN2-FN-1",
        "nombre": "Enmangar",
        "precio": 86,
        "cantidad": 1512,
        "valor": 130032
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-2",
        "nombre": "Hombros",
        "precio": 58,
        "cantidad": 1512,
        "valor": 87696
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-3",
        "nombre": "Dobladillo Manga",
        "precio": 64,
        "cantidad": 1512,
        "valor": 96768
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-4",
        "nombre": "Dobladillo Abajo",
        "precio": 66,
        "cantidad": 1512,
        "valor": 99792
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-5",
        "nombre": "Sesgo",
        "precio": 60,
        "cantidad": 1512,
        "valor": 90720
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-6",
        "nombre": "Remate",
        "precio": 43,
        "cantidad": 1512,
        "valor": 65016
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-7",
        "nombre": "Despeluze",
        "precio": 39,
        "cantidad": 1512,
        "valor": 58968
      },
      {
        "id": "FAC-IMPERIUM-SN2-FN-8",
        "nombre": "Unir Sesgo",
        "precio": 35,
        "cantidad": 1512,
        "valor": 52920
      }
    ],
    "asignaciones": [
      {
        "id": "FAC-IMPERIUM-SN2-AS-1",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "HOMBROS T4",
        "cantidad": 504,
        "valor": 29232,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-2",
        "operativeId": "OP-004",
        "operativeName": "Mongui",
        "detalle": "ENMANGAR T4",
        "cantidad": 252,
        "valor": 21672,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-3",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGAR T14",
        "cantidad": 504,
        "valor": 43344,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-4",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGART4",
        "cantidad": 252,
        "valor": 21672,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-5",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "CIERRE T4",
        "cantidad": 504,
        "valor": 44856,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-6",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "REMATE",
        "cantidad": 1512,
        "valor": 65016,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-7",
        "operativeId": "OP-006",
        "operativeName": "Ana",
        "detalle": "CIERRE T12",
        "cantidad": 504,
        "valor": 44856,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-8",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "CIERRE T14",
        "cantidad": 504,
        "valor": 44856,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-9",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "SESGO T12",
        "cantidad": 504,
        "valor": 30240,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-10",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLO MANGA",
        "cantidad": 1512,
        "valor": 96768,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-11",
        "operativeId": "OP-001",
        "operativeName": "Damelis",
        "detalle": "DOBLADILLOABAJO",
        "cantidad": 1512,
        "valor": 99792,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-12",
        "operativeId": "OP-007",
        "operativeName": "Maria",
        "detalle": "UNIR SESGO",
        "cantidad": 1512,
        "valor": 52920,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-13",
        "operativeId": "OP-005",
        "operativeName": "Jorge",
        "detalle": "SESGO T4 T14",
        "cantidad": 1008,
        "valor": 60480,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-14",
        "operativeId": "OP-011",
        "operativeName": "Juan",
        "detalle": "HOMBROS T14",
        "cantidad": 504,
        "valor": 29232,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-15",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "HOMBROS T12",
        "cantidad": 504,
        "valor": 29232,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-16",
        "operativeId": "OP-010",
        "operativeName": "Cristian",
        "detalle": "DESPELUZE",
        "cantidad": 1512,
        "valor": 58968,
        "prestamos": null
      },
      {
        "id": "FAC-IMPERIUM-SN2-AS-17",
        "operativeId": "OP-003",
        "operativeName": "Yuli",
        "detalle": "ENMANGO T12",
        "cantidad": 504,
        "valor": 43344,
        "prestamos": null
      }
    ]
  }
];
