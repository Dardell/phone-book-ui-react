import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntryService from "../services/EntryService.js";
import Entry from "./Entry.js";

const EntryList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState(null);
    const [isDisabled, setDisabled] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await EntryService.getEntries();
            setEntries(response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Ошибка подключения к backend серверу");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const updateAsync = async () => {
        alert("Async метод начал свою работу. Данная кнопка заблокированна на время выполнения");
        setDisabled(true);
        const responses = await EntryService.getEntries();
        await timeout(2500);
        responses.data.forEach(response => {
            response.asyncString = Number(response.asyncString) + 1;
            response.date = "keepTheDate";
            EntryService.updateEntry(response, response.id);
        })
        await timeout(2500);
        alert("Async метод завершил работу. К значению поля была прибавлена 1");
        fetchData();
        setDisabled(false);
    };

    const deleteEntry = (e, id) => {
        if (window.confirm("Вы действительно хотите удалить запись?")) {
            e.preventDefault();
            EntryService.deleteEntry(id).then(() => {
                if (entries) {
                    setEntries((prevElement) => {
                        return prevElement.filter((entry) => entry.id !== id);
                    })
                }
            })
        }
    };

    return (
        <div className="container mx-6 my-4 min-w-full">
            <div className="h-12 ">
                <button
                    onClick={() => navigate("/addEntry")}
                    className="rounded bg-slate-600 text-white px-6 py-2 fnot-semibold">Добавить запись</button>
                <button
                    disabled={isDisabled}
                    onClick={() => updateAsync()}
                    className="rounded float-right bg-emerald-800 text-white mx-16 px-6 py-2 fnot-semibold">
                    Асинхронная обработка всех записей таблицы (с доп. искуственной задержкой в 5 секунд)</button>
            </div>
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-2 px-6">
                                Имя</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-2 px-6">
                                Номер телефона</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-2 px-6">
                                Дата добавления/изменения записи</th>
                            <th className="text-center font-medium text-gray-500 uppercase tracking-wider py-2 px-6">
                                Строка для проверки async метода (доп задание)</th>
                            <th className="text-center font-medium text-gray-500 uppercase tracking-wider py-2 pr-14">
                                Действия</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody className="bg-white">
                            {
                                entries.map((entry) => (
                                    <Entry
                                        entry={entry}
                                        deleteEntry={deleteEntry}
                                        key={entry.id}></Entry>
                                ))
                            }
                        </tbody>)}
                </table>
            </div>
        </div>
    );
};

export default EntryList;