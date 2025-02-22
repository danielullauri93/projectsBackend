// Define los medios de transporte permitidos
export type MedioTransporte = // Define los medios de transporte permitidos, "|" es un OR lógico (puede ser uno u otro) 
	| 'Metro'
	| 'Auto (Gasolina)'
	| 'Camioneta (Diésel)'
	| 'Motocicleta (Gasolina)'
	| 'Bus Transantiago'
	| 'Bus (Privado)'
	| 'Avión (Nacional)'
	| 'Avión (Internacional)'
	| 'Caminando';
	

// Define la estructura de un traslado
export interface Traslado {
	id: number;
	nombre_trabajador: string;
	direccion_inicio: string;
	direccion_fin: string;
	medio_transporte: MedioTransporte;
	fecha_viaje: string;
	kilometros: number;
	ida_y_vuelta: boolean;
	huella_carbono: number;
}
