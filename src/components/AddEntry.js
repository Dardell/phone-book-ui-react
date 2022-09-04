import React, { useState } from "react";
import EntryService from "../services/EntryService.js";
import { useNavigate } from "react-router-dom";

const AddEntry = () => {

    const navigate = useNavigate();

    const [entry, setEntry] = useState({
        id: "",
        asyncString: "0",
        name: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setEntry({ ...entry, [e.target.name]: value });
    }

    const saveEntry = (e) => {
        e.preventDefault();
        EntryService.saveEntry(entry).then((response) => {
            console.log(response);
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="flex max-w-2xl mx-auto shadow border-b">
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wider">
                    <h1>Добавление новой записи</h1>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-grey-600 text-sm font-normal">Имя абонента</label>
                    <input
                        type="text"
                        name="name"
                        value={entry.name}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                        onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-grey-600 text-sm font-normal">Номер телефона</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={entry.phoneNumber}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                        onChange={(e) => handleChange(e)}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-6 space-x-4">
                    <button
                        onClick={saveEntry}
                        className="rounded text-white font-semibold bg-green-500 hover:bg-green-700 py-2 px-6">
                        Добавить</button>
                    <button
                        onClick={cancel}
                        className="rounded text-white font-semibold bg-red-500 hover:bg-red-700 py-2 px-6">
                        Отмена</button>
                </div>
            </div>
        </div>
    );
}

export default AddEntry;