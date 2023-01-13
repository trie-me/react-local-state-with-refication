import {useState} from 'react'
import './App.css'
import {ExampleForm} from "./features/ExampleForm/ExampleForm";

function App() {
    const [showForm, setState] = useState(true)
    const form = showForm ? <ExampleForm/> : <></>;
    const formLabel = showForm ? 'Unload Form' : 'Render form';
    return (
        <div className="App">
            {form}
            <button onClick={() => setState(!showForm)}>{formLabel}</button>
            <button onClick={() => {
                window.localStorage.clear();
                window.location.reload()
            }}>Clear Storage
            </button>
            <br/>
            <div id='target'></div>
        </div>
    )
}

export default App
