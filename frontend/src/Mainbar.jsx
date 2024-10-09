    import React, { useEffect, useState } from 'react';
    import { FaUserCircle, FaTrashAlt } from 'react-icons/fa';
    const url = import.meta.env.VITE_PROFILE;


    export default function Mainbar() {
        const token = localStorage.getItem('jwt_token');
        const [todos, setTodos] = useState([]);
        const [input, setInput] = useState({ title: '', description: '' });
        const [showUserMenu, setShowUserMenu] = useState(false);
        const [username, setUsername] = useState([]); 
        const fetchTodos = async () => {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const resp = await response.json();
            if (response.ok) {
                if (resp.todos != undefined) {
                    setTodos(resp.todos);
                }
                let u  = resp.username;
                let name = u.split("@");
                setUsername(name);
            } else {
                console.error("Failed to fetch todos");
            }
        };
        
        useEffect(() => {
            
            fetchTodos();
        }, [token]);
        async function update() {
            let _user = username[0]+"@"+username[1];
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', 
                    },
                    
                    body: JSON.stringify({ new_array: todos, username:_user})
                });
    
                if (res.ok) {
                    const spo = await res.json();
                } else {
                    console.error("Failed to update todos");
                }
            } catch (err) {
                console.log(err);
            }
        }

        useEffect(() => {
                update();
        }, [todos, username, token]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setInput({ ...input, [name]: value });
        };

        const addTodo = () => {
            if (input.title.trim() && input.description.trim()) {
                setTodos([{ title: input.title, description: input.description }, ...todos]); 
                setInput({ title: '', description: '' });
            }
        };
        const updateTodo = (index)=>{
            const updatedTodos=todos.filter((todo, i) => {
                if(i == index){
                    setInput({title:todo.title,description:todo.description});
                }
                else {
                    return todo;
                }
            }); 
            setTodos(updatedTodos); 

        }

        const deleteTodo = (index) => {
            const updatedTodos = todos.filter((_, i) => i !== index);
            setTodos(updatedTodos); 
        
            if (updatedTodos.length === 0) {
                update(); 
            }
        };

        return (
            <div className="bg-gray-100 h-screen w-full p-8 overflow-y-auto relative">
                <nav className="bg-green-300 h-16 flex items-center justify-between px-6 text-xl font-semibold text-white">
                    <span>Todo List</span>
                    <div className="relative">
                        <FaUserCircle
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        />
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
                                <div className="p-2 cursor-pointer hover:bg-gray-100 text-red-500">{username[0]}</div>
                                <div className="p-2 cursor-pointer hover:bg-gray-100 text-red-500">Change Username</div>
                                <div className="p-2 cursor-pointer hover:bg-gray-100 text-red-500">Change Password</div>
                            </div>
                        )}
                    </div>
                </nav>
                <div className="mt-6">
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                        <textarea
                            name="title"
                            placeholder="Title ..."
                            value={input.title}
                            onChange={handleInputChange}
                            className="mb-2 p-2 border border-gray-300 rounded resize-none max-h-24 overflow-auto"
                            rows={1}
                            style={{ maxHeight: '100px' }}
                        />
                        <textarea
                            name="description"
                            placeholder="Description ..."
                            value={input.description}
                            onChange={handleInputChange}
                            className="mb-2 p-2 border border-gray-300 rounded resize-none max-h-48 overflow-auto"
                            rows={3}
                            style={{ maxHeight: '150px' }}
                        />
                    </div>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
                        onClick={addTodo}
                    >
                        Add Todo
                    </button>
                </div>
                <div className="mt-6">
                    <ul className="space-y-4">
                        {todos.map((todo, index) => (
                            <Note key={index} index={index} todo={todo} onUpdate = {updateTodo} onDelete={deleteTodo} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    function Note({ index, todo, onDelete, onUpdate }) {
        return (
            <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center w-full"> 
                    <div>
                        <input type="checkbox" className="mr-4" />
                    </div>
                    <div 
                        onClick={() => onUpdate(index)} 
                        className="h-full w-full break-words" 
                    >
                        <strong className="block">{todo.title}</strong> 
                        <p className="break-words">{todo.description}</p> 
                    </div>
                </div>
                <div>
                    <FaTrashAlt className="text-red-500 cursor-pointer" onClick={() => onDelete(index)} />
                </div>
            </li>
        );
    }
    
