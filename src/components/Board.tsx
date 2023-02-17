import React, { useEffect, useState } from 'react';
import '../App.css'
import ValueSelector from './ValueSelector';
const Board = (props: any) => {
    /*
    Renders the board, including spaces for user input.
    */

    const starting_board = [
        [0, 0, 0, 0, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0]
      ]

      const modifiable_board = [
        [true, true, true, true, false, true, false, true, false],
        [false, false, true, true, false, true, true, false, true],
        [false, false, true, true, true, false, false, true, true],
        [false, false, true, false, true, true, true, false, true],
        [true, true, false, false, true, false, false, true, true],
        [true, false, true, true, true, false, true, false, false],
        [true, true, false, false, true, true, true, false, false],
        [true, false, true, true, false, true, true, false, false],
        [false, true, false, true, false, false, true, true, true]
      ]

      const [board, updateBoard] = useState(starting_board)
      const [message, setMessage] = useState("")
 

    useEffect(() => {
        console.log(board)
    }, [board])

    const onBoardChange = (row: number, col: number, value: string) => {
        console.log("board updated at position ", row, col)
        updateBoard((prevState: any) => {
            let new_board = [...prevState]
            new_board[row][col] = parseInt(value)
            return new_board
        })
    }

    const checkWin = () => {
        let win = true;

        //check that every row has no repeated values
        for( let i = 0; i < board.length; i++ ) {
            let foundVals: Array<number> = []
            for( let j = 0; j < board[i].length; j++ ){
                if(board[i][j] == 0) {
                    setMessage("")
                    return
                }else if( foundVals.includes(board[i][j]) ) {
                    win = false;
                    setMessage("Duplicate value found")
                    return
                }
                foundVals.push(board[i][j])
            }
        }

        if( win ) {
            //check columns
            for( let i = 0; i < board[0].length; i++ ) {
                let foundVals: Array<number> = []
                for( let j = 0; j < board.length; j++ ) {
                    if(board[j][i] == 0) {
                        setMessage("")
                        return
                    }else if( foundVals.includes(board[j][i])) {
                        win = false
                        setMessage("Duplicate value found")
                        return
                    } else {
                        foundVals.push(board[j][i])
                    }
                }
            }
        }


        if( win ) {
            //check boxes
            for( let boxRow = 0; boxRow < board.length/3; boxRow++ ) {
                for( let boxCol = 0; boxCol < board[0].length /3; boxCol++ ) {
                    //0 through 3
                    let foundVals: Array<number> = []
                    for( let i = boxRow*3; i < (boxRow + 1)* 3; i++ ) {
                        for( let j = boxCol*3; j < (boxCol+1)*3; j++ ) {
                            if(foundVals.includes(board[i][j])) {
                                win = false;
                                setMessage("Duplicate value found")
                                return
                            }else {
                                foundVals.push(board[i][j])
                            }
                        }
                    }
                }
            }
        }

        if( win ) {
            setMessage("Completed!")
        }


    }

    return (
        <div>
            <table id="boardTable">
                <tbody>
                    {board.map((row: Array<number>, rowIndex: number) => 
                        <tr key={rowIndex}>
                            {row.map((grid: number, gridIndex: number) => 
                                <td key={rowIndex+""+gridIndex}>{!modifiable_board[rowIndex][gridIndex] ? grid : <ValueSelector rowIndex={rowIndex} gridIndex={gridIndex} updateBoard={onBoardChange} />}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>

            
            <p>{message}</p>

            <button onClick={checkWin}>Check answers</button>
        </div>
    )
}

export default Board