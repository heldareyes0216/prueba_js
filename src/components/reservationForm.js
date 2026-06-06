export const reservationFormComponent = (spaces) => `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 class="text-base font-bold text-slate-700 mb-4">Reservaciones de funciones</h3>
        <form id="form-reservation" class="space-y-4">
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase">Seleccionar Sala</label>
                <select id="res-space" required class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                    ${spaces.map(s => `<option value="${s.id}">${s.name} (${s.type})</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase">Fecha</label>
                <input type="date" id="res-date" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase">Horario</label>
                    <input type="time" id="res-start" required class="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>

                
                
            </div>
            
            <button type="submit" class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors shadow">
                Confirmar Reserva
            </button>
        </form>
    </div>
`;