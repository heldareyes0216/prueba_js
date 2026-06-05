export const validators = {
    checkOverlap(allReservations, spaceId, date, startTime, endTime) {
        return allReservations.some(res => {
            return (
                res.spaceId === spaceId &&
                res.date === date &&
                res.status !== 'Cancelled' && res.status !== 'Rejected' && // Se ignoran cancelaciones previas
                ((startTime >= res.startTime && startTime < res.endTime) || // Choque de entrada interno
                 (endTime > res.startTime && endTime <= res.endTime) ||     // Choque de salida interno
                 (startTime <= res.startTime && endTime >= res.endTime))    // La solicitud absorbe a una reserva previa
            );
        });
    }
};