import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import { findIndex } from "./find-index"
import styles from '../styles/SideTree.module.css'


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
// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

export function  SideTree() {
  const [colors, setColors] = useState(initialColors)

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

const Item = ({ color, setPosition, moveItem, i }) => {
  const [isDragging, setDragging] = useState(false)
  const ref = useRef(null)

  const dragOriginY = useMotionValue(0)

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    })
  })

  return (
    <motion.li
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      className={styles.li}
      style={{ background: color, height: 20 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      // drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          dragOriginY.set(dragOriginY.get() + delta.y);
        }
        return !isDragging;
      }}
    >
      Note {i}  
    </motion.li>
  );
};