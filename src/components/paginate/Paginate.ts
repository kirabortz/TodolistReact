import {TodolistsDomainType} from '../../features/todolistsList/todolists-reducer';


export const Paginate = (items: TodolistsDomainType[], currentPage: number, pageSize: number):TodolistsDomainType[] => {
    const startIndex = (currentPage - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}
