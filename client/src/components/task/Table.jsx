import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../Dialogs";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import AddTask from "./AddTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const [trashTask] = useTrashTaskMutation()

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  }
  const deleteHandler = async() => {
    try{
      const result = await trashTask({
        id: selected,
        isTrash: "trash",
      }).unwrap()
      toast.success(result?.message);

      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    }catch(error){
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-white  text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 line-clamp-1'>Created At</th>
        <th className='py-2'>Assets</th>
        <th className='py-2'>Team</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-200 text-white  '>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className='w-full line-clamp-2 text-base text-white'>
            {task?.title}
          </p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg text-white", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className='py-2'>
        <span className='text-sm text-white'>
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-white'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-white dark:text-white'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-white dark:text-white'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
          onClick={()=> editTaskHandler(task)}
        />

        <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );
  return (
    <>
      <div className='bg-[#f75fea]  px-2 md:px-4 pt-4 pb-9 shadow-md rounded-3xl'>
        <div className='overflow-x-auto'>
          <table className='w-full '>
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
      open={setOpenEdit}
      setOpen={setOpenEdit}
      task={selected}
      key={new Date().getTime()}
      />
    </>
  );
};

export default Table;