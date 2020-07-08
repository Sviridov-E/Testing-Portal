import { useState } from "react"

export const useSortTable = (setTableData) => {
    const [state, setState] = useState({
        last: null,
        direction: 'down',
    });
    const inverseDirection = dir => dir === 'down' ? 'up' : 'down';
    const sortField = (profiles, fieldIndex) => {
        const direction = fieldIndex === state.last ? inverseDirection(state.direction) : 'down';
        
        const sorted = profiles.sort((a, b) => {
            const aValue = isNaN(parseFloat(a.values[fieldIndex])) ? a.values[fieldIndex] : parseFloat(a.values[fieldIndex]);
            const bValue = isNaN(parseFloat(b.values[fieldIndex])) ? b.values[fieldIndex] : parseFloat(b.values[fieldIndex]);
            if(aValue > bValue) return direction === 'down' ? 1 : -1;
            if(aValue < bValue) return direction === 'down' ? -1 : 1;;
            if(aValue === bValue) return 0;
            throw new Error('Ошибка при сортировке');
        })
        return sorted;
    }
    const changeOrder = fieldIndex => {
        setState({
            ...state,
            direction: state.last === fieldIndex ? inverseDirection(state.direction) : 'down',
            last: fieldIndex
        });
        setTableData(data => ({...data, profiles: sortField(data.profiles, fieldIndex)}));
    }
    return {sortTable: changeOrder, direction: state.direction, sortedFieldIndex: state.last};
}