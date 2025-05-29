import React from "react"

type Dimensions = {
	width: number
	height: number
}

export function useResizeObserver<T extends HTMLElement>(
	callback?: (dimensions: Dimensions, element: Element) => void,
	delay: number = 100
): [React.RefObject<T>, Dimensions | null] {
	const ref = React.useRef<T>(null)
	const [dimensions, setDimensions] = React.useState<Dimensions | null>(null)
	const last = React.useRef<Dimensions | null>(null)
	const timeout = React.useRef<NodeJS.Timeout | null>(null)
	
	React.useEffect(() => {
		const element = ref.current
		if (!element) return
		
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect
				const newDims = { width, height }
				
				if (last.current && last.current.width === width && last.current.height === height) {
					return // Skip identical values
				}
				
				last.current = newDims
				
				if (timeout.current) clearTimeout(timeout.current)
				timeout.current = setTimeout(() => {
					setDimensions(newDims)
					if (callback) callback(newDims, entry.target)
				}, delay)
			}
		})
		
		resizeObserver.observe(element)
		
		return () => {
			resizeObserver.disconnect()
			if (timeout.current) clearTimeout(timeout.current)
		}
	}, [callback, delay])
	
	return [ref, dimensions]
}
