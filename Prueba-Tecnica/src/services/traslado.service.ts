// Objeto que contiene los factores de emisión de CO₂ (en kg de CO₂ por km recorrido) para diferentes medios de transporte
const factoresEmision = {
	Metro: 0.033,
	'Auto (Gasolina)': 0.21,
	'Camioneta (Diésel)': 0.249,
	'Motocicleta (Gasolina)': 0.092,
	'Bus Transantiago': 0.039,
	'Bus (Privado)': 0.012,
	'Avión (Nacional)': 0.279,
	'Avión (Internacional)': 0.179,
	Caminando: 0
}

// Función que calcula la huella de carbono en base a la distancia recorrida y el medio de transporte
export const calcularHuellaCarbono = (
	kilometros: number, // Distancia recorrida en kilómetros
	medioTransporte: string // Medio de transporte utilizado
): number => {
	// Obtiene el factor de emisión correspondiente al medio de transporte
	const factor =
		factoresEmision[medioTransporte as keyof typeof factoresEmision]

	// Retorna la cantidad de CO₂ emitida (kilómetros multiplicado por el factor de emisión)
	return kilometros * factor
}

// Notas:
// factoresEmision: Es un objeto que almacena los valores de emisión de CO₂ por km recorrido, según el medio de transporte.

// calcularHuellaCarbono: Recibe la cantidad de kilómetros recorridos y el medio de transporte.
// Busca el factor de emisión correspondiente dentro del objeto factoresEmision.
// Multiplica los kilómetros por el factor de emisión para obtener la huella de carbono total.
