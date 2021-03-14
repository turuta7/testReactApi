import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';


// ress().then(x =>console.log(x))

function App() {
    const [inputField, setInputField] = useState({
        email: '',
        username: '',
        password: ''
    })
    const [counter, setCounter] = useState([]);

    useEffect( () => {
        (async function (){
            const dataJSON = await axios.get('https://testrecetapi.herokuapp.com/users')
            setCounter(await dataJSON.data)
        })()

    })

    const del = async (id) => {
        console.log(id)
        await axios.delete(`https://testrecetapi.herokuapp.com/users/${id}`)
        // await inc()
        // setCounter(await dataJSON.data)
    }


    const arrayData = counter.map((data, index) => {
        return (
            <tr key={index}>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>{data.username}</td>
                <button onClick={() => del(data._id)}> X</button>
            </tr>
        )


    })




    const inputsHandler = (e) => {
        setInputField({...inputField, [e.target.name]: e.target.value})
    }

    const submitButton = async () => {
        const as = await axios.post('https://testrecetapi.herokuapp.com/users/', inputField)
        console.log(as)
        console.log('----------')
        console.log(inputField)
        console.log('----------')

    }


    return (
        <div>


            <div>
                <input
                    type="text"
                    name="email"
                    onChange={inputsHandler}
                    placeholder="email"
                    value={inputField.email}/>

                <br/>

                <input
                    type="text"
                    name="username"
                    onChange={inputsHandler}
                    placeholder="username"
                    value={inputField.username}/>

                <br/>

                <input
                    type="text"
                    name="password"
                    onChange={inputsHandler}
                    placeholder="password"
                    value={inputField.password}/>

                <br/>

                <button onClick={submitButton}>Submit Now</button>
            </div>


            <table>
                <tbody>
                {arrayData}
                </tbody>
            </table>
            {/*<button onClick={inc}>Добавить</button>*/}

        </div>
    );
}

export default App;
