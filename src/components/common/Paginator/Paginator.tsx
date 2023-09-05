import React, {useState} from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames'

type PaginatorPropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (page: number) => void
	portionSize: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
	const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
	const pages = [];
	for (let i = 1; i < pagesCount; i++) {
		pages.push(i);
	}

	const portionCount = Math.ceil(pagesCount / props.portionSize);
	const [portionNumber, setPortionNumber] = useState(1);
	const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
	const rightPortionPageNumber = portionNumber * props.portionSize;

	return (
		<div className={styles.paginator}>
			{portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
			{pages
				.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
				.map(page => {
					return <span className={cn({
						[styles.selectedPage] : props.currentPage === page
					}, styles.pageNumber)} key={page} onClick={(e) => props.onPageChanged(page)}>{page}</span>
				})
			}
			{portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
		</div>
	)
}
