import React, { useEffect, useState } from 'react';
import '../App.css'
const Board = (props: any) => {
    /*
    Renders the board, including spaces for user input.
    */

    const starting_board = [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0]
      ]

      const [board, updateBoard] = useState(starting_board)


    useEffect(() => {
        console.log(board)
    }, [board])

    const onBoardChange = (row: number, col: number, value: string) => {
        console.log("board updated at position ", row, col)
        updateBoard((prevState: any) => {
            prevState[row][col] = parseInt(value)
            return prevState
        })
    }

    return (
        <div>
            <table id="boardTable">
                <tbody>
                    {board.map((row: Array<number>, rowIndex: number) => 
                        <tr key={rowIndex}>
                            {row.map((grid: number, gridIndex: number) => 
                                <td key={rowIndex+""+gridIndex}>{grid != 0 ? grid : 
                                <input className="numInput" key={rowIndex+""+gridIndex} type="number" onChange={
                                    e => onBoardChange(rowIndex, gridIndex, e.target.value) 
                                } />}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Board