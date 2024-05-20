import { useState, useEffect } from "react";
import Todo from "./Todo";

export default function Main() {
    const savedTasks = localStorage.getItem("tasks");
    const [task, setTask] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [taskList, setTaskList] = useState(
        savedTasks ? JSON.parse(savedTasks) : []
    );

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }, [taskList]);

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!task.length > 0) {
            setShowWarning("Task content cannot be empty");
        } else if (task.length > 100) {
            setShowWarning("Task content cannot be more than 100 chars");
        } else {
            setIsFirstLoad(false);
            setTaskList((prevState) => [
                ...prevState,
                { content: task, done: false, added: new Date() },
            ]);
            setTask("");
        }
    };

    const handleToDoCompletion = (index) => {
        setTaskList(
            taskList.map((task, i) =>
                i === index
                    ? { ...task, done: !task.done, triggerDelete: false }
                    : task
            )
        );
    };

    const handleDelete = (index) => {
        setTaskList(
            taskList.map((task, i) =>
                i === index ? { ...task, triggerDelete: true } : task
            )
        );

        setTimeout(() => {
            setTaskList(taskList.filter((_, i) => i !== index));
        }, 500);
    };

    useEffect(() => {
        if (!showWarning) return;
        const timerId = setTimeout(() => {
            setShowWarning("");
        }, 1500);

        () => clearTimeout(timerId);
    }, [showWarning]);

    return (
        <main className="w-full grow flex flex-col gap-10 pt-[25px] xl:pt-[50px]">
            <form onSubmit={handleSubmit} className="relative w-full">
                <input
                    className="border-2 border-slate-300 rounded p-3 w-full bg-transparent text-[17px] lg:text-[19px] xl:text-[22px] 2xl:text-[24px] placeholder:text-slate-300 text-slate-200 font-[500] shadow-xl pr-[50px] xl:pr-[100px] outline-lime-300"
                    type="text"
                    placeholder="Enter a title for a task..."
                    value={task}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="absolute right-2 xl:right-5 top-[50%] translate-y-[-50%] bg-white  flex items-center justify-center w-[30px] h-[30px] xl:w-[35px] xl:h-[35px] rounded-full md:hover:opacity-50 cursor-pointer transition-all"
                >
                    <i className="fa-solid fa-plus text-[15px] xl:text-[20px] text-[#018583] font-[900]"></i>
                </button>
            </form>
            <div className="w-full h-[5px] border-b border-slate-300">
                <p
                    className={`py-2 text-yellow-500 translate-y-[-25px] ${
                        showWarning ? "block" : "hidden"
                    }`}
                >
                    {showWarning}
                </p>
            </div>
            {taskList.length > 0 ? (
                <ul className="w-full flex flex-col-reverse gap-5 pb-[50px]">
                    {taskList.map((todo, index) => (
                        <Todo
                            key={index}
                            todo={todo}
                            index={index}
                            isFirstLoad={isFirstLoad}
                            handleToDoCompletion={handleToDoCompletion}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            ) : (
                <p className="w-full text-center pt-[100px]">
                    <i className="fa-solid fa-arrow-down text-5xl lg:text-6xl xl:text-7xl"></i>
                </p>
            )}
        </main>
    );
}
