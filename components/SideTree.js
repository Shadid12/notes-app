import { useState, useRef, useEffect } from "react"
import { getDocumentsByUser } from "./MainEditor/editorSlice"
import styles from '../styles/SideTree.module.css'
import { Item } from "./SideTreeItem";
import { useDispatch } from "react-redux";


export function arrayMoveMutable(array, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}
}

export function arrayMoveImmutable(array, fromIndex, toIndex) {
	array = [...array];
	arrayMoveMutable(array, fromIndex, toIndex);
	return array;
}



const initialColors = ["#fbf8cc", "#ffcfd2", "#cfbaf0", "#bbdefb", "#a3c4f3", "#98f5e1"]

export function  SideTree() {
  const [colors, setColors] = useState(initialColors)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDocumentsByUser())
  }, [])

  const positions = useRef([]).current
  const setPosition = (i, offset) => (positions[i] = offset)

  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setColors(arrayMoveImmutable(colors, i, targetIndex));
  }

  return (
    <>
    <input className={styles.input}/>
    <button className={styles.search}>Search</button>
    <ul className={styles.ul}>
      {colors?.map((color, i) => (
        <Item
          key={color}
          i={i}
          color={color}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </ul>
    </>
  )
}