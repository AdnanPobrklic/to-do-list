import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function Todo({
    todo,
    index,
    handleDelete,
    handleToDoCompletion,
    isFirstLoad,
}) {
    const todoRef = useRef(null);

    useEffect(() => {
        if (isFirstLoad) {
            gsap.fromTo(
                todoRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, delay: 0.35 }
            );
        } else {
            gsap.fromTo(
                todoRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.55 }
            );
        }
    }, [index]);

    return (
        <li
            className={`border-2 border-slate-400 rounded-[15px] flex justify-between gap-5 px-5 py-2 text-xl shadow-inner opacity ${
                todo.done
                    ? "line-through decoration-[3px] decoration-yellow-500"
                    : ""
            } ${
                todo.triggerDelete
                    ? "translate-x-[-1500px] transition-all duration-500"
                    : ""
            }
            `}
            ref={todoRef}
        >
            <p
                onClick={() => handleToDoCompletion(index)}
                className="cursor-pointer md:hover:opacity-50 transition-all font-[500] text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px]  break-all"
            >
                {todo.content}
            </p>

            <button onClick={() => handleDelete(index)}>
                <i className="fa-solid fa-trash-can md:hover:text-red-400 transition-all cursor-pointer "></i>
            </button>
        </li>
    );
}
