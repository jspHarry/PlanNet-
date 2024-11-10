import { createSubTask, deleteRestoreTask, trashTask } from "../../../../../server/controllers/taskController";
import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getDashboardStats: builder.query({
            query:() => ({
                url: `${TASKS_URL}/dashboard`,
                method: "GET",
                Credentials: "include",
            }),
        }),
        getAllTask: builder.query({
            query:({ strQuery, isTrashed, search}) => ({
                url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: "GET",
                Credentials: "include",
            }),
        }),

        createTask: builder.mutation({
            query:( data ) => ({
                url: `${TASKS_URL}/create`,
                method: "POST",
                body: data,
                Credentials: "include",
            }),
        }),
        duplicateTask: builder.mutation({
            query:( id) => ({
                url: `${TASKS_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                Credentials: "include",
            }),
        }),
        updateTask: builder.mutation({
            query:( data) => ({
                url: `${TASKS_URL}/update/${data._id}`,
                method: "PUT",
                body: data,
                Credentials: "include",
            }),
        }),
        trashTask: builder.mutation({
            query:( {id}) => ({
                url: `${TASKS_URL}/${id}`,
                method: "PUT",
                Credentials: "include",
            }),
        }),
        createSubTask: builder.mutation({
            query:({data,id}) => ({
                url: `${TASKS_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        deleteRestoreTask: builder.mutation({
            query:({id, actionType}) => ({
                url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    }),
});

export const {useGetDashboardStatsQuery, useGetAllTaskQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useDeleteRestoreTaskMutation
} = taskApiSlice;