import { useState } from "react"

const ValueSelector = (props: any) => {
    const [value, setValue] = useState(props.value)

    const handleChange = (value: number) => {
        setValue(value)

        props.updateBoard(props.rowIndex, props.gridIndex, value)
    }

    return <input className="numInput" key={props.rowIndex+""+props.gridIndex} value={value} type="number" onChange={
        e => handleChange(parseInt(e.target.value))
    } />
}

export default ValueSelector;