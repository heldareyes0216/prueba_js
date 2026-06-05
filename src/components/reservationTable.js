export const reservationTableComponent = (reservations, spaces, user) => {
    if (reservations.length === 0) {
        return `<div class="bg-white p-6 text-center text-sm text-slate-400 rounded-xl border border-slate-200 shadow-sm">No existen registros en el sistema.</div>`;
    }

    return `
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table class="min-w-full divide-y divide-slate-200 text-sm text-left">
                <thead class="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                        <th class="px-6 py-3">Espacio</th>
                        ${user.role === 'admin' ? '<th class="px-6 py-3">Usuario</th>' : ''}
                        <th class="px-6 py-3">Fecha y Horario</th>
                        <th class="px-6 py-3">Motivo</th>
                        <th class="px-6 py-3">Estado</th>
                        <th class="px-6 py-3 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 text-slate-700">
                    ${reservations.map(res => {
                        const space = spaces.find(s => s.id == res.spaceId);
                        
                        let badgeStyle = 'bg-yellow-50 text-yellow-700 border-yellow-200';
                        if (res.status === 'Approved') badgeStyle = 'bg-green-50 text-green-700 border-green-200';
                        if (res.status === 'Rejected') badgeStyle = 'bg-red-50 text-red-700 border-red-200';
                        if (res.status === 'Cancelled') badgeStyle = 'bg-slate-50 text-slate-500 border-slate-200';

                        return `
                            <tr class="hover:bg-slate-50/80 transition-colors">
                                <td class="px-6 py-4 font-semibold text-slate-800">${space ? space.name : 'N/A'}</td>
                                ${user.role === 'admin' ? `<td class="px-6 py-4 text-xs font-medium text-indigo-600">${res.userName}</td>` : ''}
                                <td class="px-6 py-4 text-xs font-mono">${res.date}<br>${res.startTime} - ${res.endTime}</td>
                                <td class="px-6 py-4 max-w-xs truncate italic">"${res.reason}"</td>
                                <td class="px-6 py-4"><span class="px-2.5 py-0.5 rounded-md font-semibold border text-xs ${badgeStyle}">${res.status}</span></td>
                                
                                <td class="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                                    ${user.role === 'admin' && res.status === 'Pending' ? `
                                        <button data-id="${res.id}" data-action="approve" class="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors">Aprobar</button>
                                        <button data-id="${res.id}" data-action="reject" class="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition-colors">Rechazar</button>
                                    ` : ''}

                                    ${user.role === 'user' && (res.status === 'Pending' || res.status === 'Approved') ? `
                                        <button data-id="${res.id}" data-action="cancel" class="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded hover:bg-amber-600 transition-colors">Cancelar</button>
                                    ` : ''}

                                    ${user.role === 'admin' ? `
                                        <button data-id="${res.id}" data-action="delete" class="px-2 py-1 bg-slate-800 text-slate-200 text-xs font-semibold rounded hover:bg-slate-900 transition-colors">Eliminar</button>
                                    ` : ''}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
};