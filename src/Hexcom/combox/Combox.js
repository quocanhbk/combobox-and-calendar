import React, {useState, useEffect, useRef} from 'react'
import { BsChevronDown } from "react-icons/bs";
import './Combox.css'

function useIsOpen(init) {
    const [isOpen, setIsOpen] = useState(init);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
            console.log('click')
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isOpen, setIsOpen };
}

function Item(props) {
    const [out, setOut] = useState(false)
    const onClick = () => {
        setOut(true);
        setTimeout(() => {
            props.removeName()
        },300)
    }
    return (
        <div className={out ? "item-name item-out" : "item-name"} onClick={onClick} style={{backgroundColor: props.bg}}>{props.name}</div>
    )
}
function Combobox(props) {
    const { ref, isOpen, setIsOpen } = useIsOpen(false);
    const [items, setItems] = useState([])
    const addName = (item) => {
        if (props.multiple) {
            if (items.includes(item))
            setItems(items.filter(n => n[props.field] !== item[props.field]))
            else 
            setItems([...items, item])
        }
        else {
            setItems([item])
            setIsOpen(false)
        }
    }

    useEffect(() => {
        props.returnData(items)
    })
    const removeName = (name) => {
        setItems(items.filter(n => n[props.field] !== name))
    }
    return (
        <div className={"combox-container " + props.className} ref={ref}>
            <div className="combox-bar">
                <div className="combox-name" onClick={() => setIsOpen(true)}>
                    {items.map(item => 
                    <Item key={item[props.field]} name={item[props.field]} removeName={() => removeName(item[props.field])} bg={props.bg}/>
                    )}
                </div>
                <button className="combox-button" onClick={() => setIsOpen(!isOpen)}><BsChevronDown/></button>
            </div>
            {isOpen && 
                <div className="combox-select">
                    {props.data.map(item => 
                    <div className={items.includes(item) ? "combox-item combox-item-selecting" : "combox-item"} 
                    onClick={() => addName(item)}>{item[props.field]}</div>
                    )}
                </div>
            }
        </div>
    )
}

export default Combobox