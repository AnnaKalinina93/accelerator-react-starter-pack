/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from 'react-redux';
import { getActivePage } from '../../store/ui-state/selectors';
import cn from 'classnames';
import { activePageChange } from '../../store/ui-state/action';

type PaginationProps = {
pageCount : number;
}

function Pagination({pageCount}: PaginationProps): JSX.Element {
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch();
  const paginationPages = Array.from({ length: pageCount }, (_, i) =>  i + 1);

  const handleChangePage = (page: number) => {
    dispatch(activePageChange(page));
  };

  const START_PAGE_COUNT = activePage % 3 === 1 && activePage!==1 ? activePage +1: 0;
  const FINISH_PAGE_COUNT = START_PAGE_COUNT+3;

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        { activePage !== 1 && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link"
              data-testid="назад"
              onClick={()=>handleChangePage(activePage-1)}
            >
            Назад
            </a>
          </li>)}
        { paginationPages.slice(START_PAGE_COUNT,FINISH_PAGE_COUNT).map((page)=> {
          const classLink = cn('pagination__page',{'pagination__page--active': activePage === page});
          return (
            <li key={page} className={classLink}>
              <a className="link pagination__page-link"
                onClick={()=>handleChangePage(page)}
                data-testid={page}
              >
                {page}
              </a>
            </li>
          );
        })}
        {activePage !== pageCount && pageCount !== 0 && (
          <li className="pagination__page pagination__page--next" id="next">
            <a className="link pagination__page-link"
              onClick={()=>handleChangePage(activePage+1)}
              data-testid="далее"
            >
            Далее
            </a>
          </li>)}
      </ul>
    </div>
  );
}

export default Pagination;
