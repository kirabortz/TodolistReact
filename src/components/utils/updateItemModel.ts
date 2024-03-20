import { TodolistsDomainType} from '../../features/todolistsList/todolists-reducer';
import {UpdateTaskModelProps} from '../../api/tasks-api';

type UpdatedItemType = {
    [key: string]: string | number;
}

export const updateTodolistModel = (todolist: TodolistsDomainType, updatedParam: UpdatedItemType) => {
    return {
        id: todolist.id,
        addedDate: todolist.addedDate,
        order: todolist.order,
        title: todolist.title,
        filter: todolist.filter,
        entityStatus: todolist.entityStatus,
        ...updatedParam
    }
}
//ДЛЯ АССОЦИАТИВНЫХ МАССИВОВ/ОБЪЕКТОВ - ПЕРЕДАВАТЬ ВЛОЖЕННЫЙ ОБЪЕКТ ЦЕЛИКОМ И ОН ЗАТРЕТ ЦЕЛИКОМ ТОТ КОТОРЫЙ ТУТ - ТЕМ
//САМЫМ ИЗМЕНИТ ЕГО И ОБНОВИТ!!!!!

export const updateTaskModel = (task: UpdateTaskModelProps, updatedParam:UpdatedItemType) => {
    return {
        title: task.title,
        description: task.description,
        status:task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        entityStatus: task.entityStatus,
        ...updatedParam
    }
}