import React from 'react';
import { useNavigate } from "react-router-dom";

const Entry = ({ entry, deleteEntry }) => {

    const navigate = useNavigate();

    const editEntry = (e,id) => {
        e.preventDefault();
        navigate(`/editEntry/${id}`);
    };

    return (
        <tr key={entry.id}>
            <td className="text-left px-6 py-2">
                <div>{entry.name}</div>
            </td>
            <td className="text-left px-6 py-2">
                <div>{entry.phoneNumber}</div>
            </td>
            <td className="text-left px-6 py-2">
                <div>{entry.date}</div>
            </td>
            <td className="text-center px-6 py-2">
                <div>{entry.asyncString}</div>
            </td>
            <td className="text-center px-6 pr-14 font-medium text-sm">
                <a 
                onClick={(e) => editEntry(e, entry.id)}
                className="hover:text-indigo-800 px-4 hover:cursor-pointer">
                    Редактировать</a>
                <a 
                onClick={(e) => deleteEntry(e, entry.id)}
                className="hover:text-indigo-800 px-4 hover:cursor-pointer">
                    Удалить</a>
            </td>
        </tr>
    )
}

export default Entry