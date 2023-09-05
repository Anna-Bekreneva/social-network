import React from 'react';
import styles from './Paginator.module.css';

type PaginatorPropsType = {
	totalUsersCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (page: number) => void
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	const pages = [];
	for (let i = 1; i < pagesCount; i++) {
		pages.push(i);
	}
	return (
		<div>
			<ul>
				{pages.map((page, index) => {
					return (
						<li key={index}>
							<span className={props.currentPage === page ? styles.selectedPae : ""} onClick={(event) => {props.onPageChanged(page)}}>{page}</span>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
