import { MedioTransporte } from '../types/trasladoTypes';

// Factores de emisión de CO₂ (en kg de CO₂ por km recorrido)
const factoresEmision: Record<MedioTransporte, number> = { // Record es un objeto que tiene como llaves los valores de MedioTransporte y como valores números
	Metro: 0.033,
	'Auto (Gasolina)': 0.21,
	'Camioneta (Diésel)': 0.249,
	'Motocicleta (Gasolina)': 0.092,
	'Bus Transantiago': 0.039,
	'Bus (Privado)': 0.012,
	'Avión (Nacional)': 0.279,
	'Avión (Internacional)': 0.179,
	Caminando: 0
};

// Función que calcula la huella de carbono en base a la distancia recorrida y el medio de transporte
export const calcularHuellaCarbono = (
	kilometros: number,
	medioTransporte: MedioTransporte
): number => {
	// Obtiene el factor de emisión correspondiente al medio de transporte
	const factor = factoresEmision[medioTransporte];

	// Retorna la cantidad de CO₂ emitida
	return kilometros * factor;
};
